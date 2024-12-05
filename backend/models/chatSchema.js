const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({

    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],

    messages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'message'
    }],

    createdAt: {
      type: Date,
      default: Date.now
    }
});

module.exports = mongoose.model("Chat" , chatSchema)