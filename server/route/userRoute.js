const express = require("express");
const userRoute = express();

//userContoller
const userContoller = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

//register
userRoute.post("/register", userContoller.postRegister);

//login
userRoute.post("/login", userContoller.postLogin);

//google login
userRoute.post("/gLogin" , userContoller.gLogin)

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

//upload image 
// userRoute.post("/uploadImage" , authMiddleware ,userContoller.uploadImage)
userRoute.post("/uploadImage" ,(req,res) => {
    console.log("reached")
})




module.exports = userRoute;
