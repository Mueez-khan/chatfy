const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({


    firstName : {
        type : String,
        required : true,
        trim : true
    },
    lastName : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true
    },
    phoneNumber : {
        type : Number,
        required :  true,
        trim : true
    },
    userImage: {
        type : String
    },
    password : {
        type : String,
        required : true,
        trim : true
    }

})

module.exports = mongoose.model("User" , userSchema);



// const userSchema = {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true
//     },
//     password: {
//       type: String,
//       required: true
//     },
//     avatar: {
//       type: String,
//       default: 'default-avatar.png'
//     },
//     status: {
//       type: String,
//       enum: ['online', 'offline'],
//       default: 'offline'
//     },
//     lastSeen: {
//       type: Date,
//       default: Date.now
//     },
//     groups: [{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Group'
//     }],
//     contacts: [{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User'
//     }]
//   };
  
  // Group Schema
  
  
  // Chat Schema (for both direct and group chats)
  
  
  // Message Schema
  