const express = require("express")
const router = express.Router();

const { authenticateUser } = require("../middlewares/userMiddleware");

const {register , login } = require("../controllers/userController");
const {getAllUser } = require("../controllers/getAlluser");

router.post("/register" , register);
router.post("/login" , login);
router.get("/users"   , authenticateUser , getAllUser);



module.exports = router;