const User = require("../models/userSchema");


exports.getAllUser = async (req , res ) =>{

    try{

        // select -password means this will exclude the password field 
        const usersData = await User.find({}).select('-password');;



        return res.status(200).json({
            success : true,
            message : "Got users data",
            data :  usersData
        })

    }
    catch(err){
        console.log("Error while getting user" , err);
        return res.status(500).json({
            success : false,
            message : "Did not get users "
        })
    }

}