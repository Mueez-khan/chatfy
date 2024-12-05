import { io } from "socket.io-client";
import { useSelector } from "react-redux";

// const ownId = useSelector((state) => state.auth.user);

 // Match this with your backend URL



export const socket = io("http://localhost:8000", {
    query: { userId: ownId._id }, // Replace `ownId._id` with the correct user ID
  });
