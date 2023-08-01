const express = require("express");
const userRoute = express();

//userContoller
const userContoller = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

//register
userRoute.post("/register", userContoller.postRegister);

//login
userRoute.post("/login", userContoller.postLogin);

//getuserdata
userRoute.post("/getUserDataById", authMiddleware, userContoller.getUserData);

//edit user data by id
userRoute.post("/editUserById", authMiddleware, userContoller.editUserById);

//get chat history
userRoute.post("/getChatHistory" , authMiddleware, userContoller.getChatHistory)

//addevent
userRoute.post("/addEvent" , authMiddleware, userContoller.addEvent)


//dlete event
userRoute.post("/deleteEvent", authMiddleware,userContoller.removeEvent)


module.exports = userRoute;
