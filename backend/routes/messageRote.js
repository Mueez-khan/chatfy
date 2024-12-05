const express = require("express")
const router = express.Router();

const { messageController , getAllMessages} = require("../controllers/messageController");

const { authenticateUser } = require("../middlewares/userMiddleware");

router.post("/message/:receiverId" ,authenticateUser , messageController);
router.get("/message/get/:receiverId" ,authenticateUser , getAllMessages);


module.exports = router;