const express = require("express")
const router = express.Router();

const { authenticateUser } = require("../middlewares/userMiddleware");

const {register , login } = require("../controllers/userController");
const {getAllUser , findUserById } = require("../controllers/getAlluser");

router.post("/register" , register);
router.post("/login" , login);
router.get("/users"   , authenticateUser , getAllUser);
router.get("/user/data/:userId"   , authenticateUser , findUserById);


module.exports = router;
