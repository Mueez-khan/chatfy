const mongoose = require("mongoose")

const messageSchema = {
    
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type : String,
      required : true
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  };

  module.exports = mongoose.model("message" , messageSchema)