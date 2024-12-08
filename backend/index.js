const express = require("express");
const {app , server} = require("./socket/socket");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
const dbConnection = require("./config/database");


const userRoutes = require("./routes/userRoute.js");
const messageRoute = require("./routes/messageRote.js")

dotenv.config();


app.use(
    cors({
      origin: ['https://chatfy-rven-eh1666c0e-mueez-khans-projects.vercel.app' , 'https://chatfy-rven.vercel.app'],
      methods: "GET, POST, PATCH, DELETE, PUT",
      credentials: true,
    })
  );

// Middleware
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true }));

dbConnection();

app.use("/api/v1" , userRoutes); // User-Register_login routes
app.use("/api/v1" , messageRoute); // User-Register_login routes

app.get("/", (req, res) => {
    res.send("The app is running fine");
});

// Start server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`The app is running on port ${port}`);
});
