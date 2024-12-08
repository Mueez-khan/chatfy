import { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector  } from "react-redux";
import axios from "axios";
import { TbLogout2 } from "react-icons/tb";
import { io } from "socket.io-client";

export default function SendMessage() {
  const navigate = useNavigate();
  const { receiverId } = useParams();
  const ownId = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("token");
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState({ content: "" });
  const [socket, setSocket] = useState(null);
   const [receiverData, setReceiverData] = useState({
    data: [],
  });

  const messagesEndRef = useRef(null); // Ref for the message container

  const backToHome = () =>{
    navigate("/")
  }

// **********************************************************************
// **********************************************************************
//                          Socket io Connection                        *
// **********************************************************************
// **********************************************************************
  
  useEffect(() => {
    if (!ownId || !ownId._id) return;

    // Initialize socket connection
    const newSocket = io(`https://chatfy-production.up.railway.app`, {
      query: { userId: ownId._id },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      withCredentials: true,
    });

    setSocket(newSocket);

    // Handle new messages
    const handleMessage = (messageData) => {
      if (
        (messageData.senderId === ownId._id && messageData.receiverId === receiverId) ||
        (messageData.senderId === receiverId && messageData.receiverId === ownId._id)
      ) {
        setMessages((prevMessages) => [...prevMessages, messageData]);
      }
    };

    newSocket.on("newMessage", handleMessage);
   

    return () => {
      newSocket.off("newMessage", handleMessage);
      
      newSocket.disconnect();
    };
  }, [ownId, receiverId]);

// **********************************************************************
// **********************************************************************
//                          Fetching Messages                           *
// **********************************************************************
// **********************************************************************

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/message/get/${receiverId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(response.data.data || []);
    } catch (error) {
      console.error("Error fetching messages", error.response?.data?.success);
    }
  };


// **********************************************************************
// **********************************************************************
//                          Fetching the Receiver data                  *
// **********************************************************************
// **********************************************************************

  const userReceiverData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/user/data/${receiverId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReceiverData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching messages", error.response?.data?.success);
    }
  };

  useEffect(() => {
    if (ownId?._id && receiverId) {
      fetchMessages();
       userReceiverData();
    }
  }, [receiverId, ownId?._id]);

// **********************************************************************
// **********************************************************************
//                          To Reach the last message                   *
// **********************************************************************
// **********************************************************************

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

// **********************************************************************
// **********************************************************************
//                          Sending the message                         *
// **********************************************************************
// **********************************************************************

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  
  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/message/${receiverId}`,
        { content: userInput.content },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
      const messageData = {
        ...response.data.newMessage,
        senderId: ownId._id,
        receiverId,
      };

      socket?.emit("newMessage", messageData);
      setUserInput({ content: "" });
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

 return (
    <>
     
    <div className="flex  flex-col w-full h-screen overflow-y-auto sm:w-[80%] md:w-[60%] lg:w-[50%] mx-auto ">
    
    <div className=" top-0 sticky">
    <div className="flex  bg-green-400 shadow-md z-10 rounded ">
    <button className="text-white text-bold" onClick={backToHome}><TbLogout2 /></button>
        <img
          className="w-8 rounded-full gap-1 ml-10"
          src={receiverData.userImage}
        ></img>
        <div className="mr-2 ml-2 font-bold text-white">{receiverData.firstName} {receiverData.lastName}</div>
    

      </div>
    </div>

      <div className="flex flex-grow bg-gray-100 rounded-lg shadow-md">
        <div className="w-full flex flex-col">
          {/* Messages List */}
          <div className="flex-grow p-4 space-y-3 overflow-y-auto flex flex-col bg-white rounded-t-lg">
            {messages.map((item) => (
              <div
                key={item._id || item.createdAt}
                className={`flex w-full ${
                  item.senderId === ownId._id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-lg ${
                    item.senderId === ownId._id
                      ? "bg-green-500 text-white"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  {/* {item.senderId === receiverId ? `${item.content }
                   ${receiverData.firstName}` : item.content} */}
                  <div className="">
                    {item.senderId === receiverId ? (
                      <div className="text-left">
                      <p className="text-gray-400 text-[12px]">
                         <span>From</span> {receiverData.firstName}
                        </p>
                        <p className="text-white ">
                          {item.content}
                        </p>
                       
                      </div>
                    ) : (
                      <p className="text-white">{item.content}</p>
                    )}
                  </div>

                  {/* {item.firstName} */}
                </div>
              </div>
            ))}
            {/* Scroll to this div */}
            <div ref={messagesEndRef}></div>
          </div>

          {/* Message Input */}
          <form
            onSubmit={sendMessage}
            className="flex items-center p-3 bg-gray-100 border-t rounded-b-lg"
          >
            <input
              type="text"
              name="content"
              value={userInput.content}
              onChange={handleChange}
              placeholder="Type a message..."
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            <button
              type="submit"
              className="ml-3 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
