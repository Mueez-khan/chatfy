const Chat = require("../models/chatSchema");
const message = require("../models/messageSchema");
const { getReceiverSocketId , io  } = require("../socket/socket");

exports.messageController = async (req , res) =>{

    try{

        const receiverId = req.params.receiverId ;
        const senderId = req.user.id;
        const { content } = req.body;

        // console.log("receiverId"  , receiverId);
        // console.log("SenderID"  , senderId);
        // console.log("Content"  , content);

        let conversion = await Chat.findOne({
            participants: { $all: [senderId , receiverId] },
        });

        if(!conversion){
            conversion = await Chat.create({
                participants : [senderId , receiverId]
            })

        }

        const newMessage = new message({senderId , content , receiverId})

        if(newMessage){
            conversion.messages.push(newMessage._id);
        }

        // await Chat.save()
        // await newMessage()

        await Promise.all([conversion.save(), newMessage.save()]);

        const socketId = getReceiverSocketId(receiverId);

        console.log("Socket id : " , socketId)

        // if(socketId){
        //     io.to(socketId).emit("messageSend" , newMessage);
        // }

        return res.status(200).json({
            success : true, 
            message : "Message deliver",
            newMessage
        })

    }catch(err){
        console.log("Error while sending the Message" , err);
        return res.status(500).json({
            success : false,
            message : "Error while sending Message"
        })
    }

}



exports.getAllMessages = async (req , res) =>{

    try{

        const  receiverId  = req.params.receiverId ;
        const senderId = req.user.id;

        // console.log("ReceiverId" , receiverId);
        const conversation = await Chat.findOne({
            participants :{ $all : [senderId , receiverId]}
        }).populate("messages").exec();


        if(!conversation){
            return res.status(404).json({
                success : false,
                message :  "No chat found"
            })
        }

        // console.log("Conversion" , conversation);
        const messages = conversation.messages;

        // console.log("Messages" , messages)

        return res.status(200).json({
            success : true,
            message : "Got messages",
            data  : messages
        })


    }
    catch(err){
        console.log("Error while Getting the Messages" , err);
        return res.status(500).json({
            success : false,
            message : "Error while Getting Messages"
        })
    }

}