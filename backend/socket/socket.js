const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();



const server = http.createServer(app);
const io = new Server(server, {
cors: {
     origin: ["https://chatfy-rven.vercel.app" , 'https://chatfy-rven-git-master-mueez-khans-projects.vercel.app],
    withCredentials: true,
  },
});

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  // console.log("a user connected", socket.id);

  // console.log("UsersocketMap" , userSocketMap);
  const userId = socket.handshake.query.userId;
  // console.log("Userid" ,userId);
  if (userId !== "undefined" && userId !== null) {
    // Map userId to socketId
    userSocketMap[userId] = socket.id;
  }

  socket.on("newMessage", (messageData) => {
    const receiverSocketId = getReceiverSocketId(messageData.receiverId);


    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", messageData); // Send to receiver
    }
  
    socket.emit("newMessage", messageData); // Send to sender
  });

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // socket.on() is used to listen to the events. can be used both on client and server side
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { app, io, server, getReceiverSocketId };
