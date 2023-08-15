//import User model
const User = require("../model/userModel");
//bcrypt config import
const { securePassword } = require("../config/bcryptConfig");
const bcrypt = require("bcrypt");
//import jwt
const jwt = require("jsonwebtoken");
const chatHistoryModel = require("../model/chatHistory");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "djc5wnfyy",
  api_key: "142765546452766",
  api_secret: "uiKiJNLSkjoDvwTLTuHBhkx21wQ",
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

//post register
const postRegister = async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      res.status(200).send({ message: "User already exist", success: false });
    } else {
      const data = new User({
        email: req.body.email,
        name: req.body.name,
        password: await securePassword(req.body.password),
        number: req.body.number,
      });

      await data.save();
      res
        .status(200)
        .send({ message: " registered successfully", success: true });
    }
  } catch (error) {
    res.status(500).send({ message: " register not reached", success: false });

    console.log(error + "error");
  }
};

//postLogin
const postLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_Secret, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .send({ message: "User logged in successfully", success: true, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: " server error", success: false });
  }
};

//get user data by id
const getUserData = async (req, res) => {
  try {
    const data = await User.findById(req.body.userId);

    if (data) {
      res
        .status(200)
        .send({ message: "User data Recieved", success: true, data });
    } else {
      res.status(400).send({ message: "user not found ", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server side Error ", success: false });
  }
};

//edit user profile with id
const editUserById = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.body.userId, {
      name: req.body.name,
      email: req.body.email,
    });
    if (result) {
      res
        .status(200)
        .send({ message: "User profile updated successfully", success: true });
    } else {
      res
        .status(200)
        .send({ message: "User profile not updated", success: false });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting user info", success: false, error });
  }
};

// get chat history
const getChatHistory = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const data = await chatHistoryModel.find();
    if (data) {
      res.status(200).send({
        message: "Chat data Recieved",
        data,
        userId: user.name,
        success: true,
      });
    } else {
      res
        .status(200)
        .send({ message: "Cannot get chat history", success: false });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting user info", success: false, error });
  }
};

//add event to db
const addEvent = async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(req.body.userId, {
      $push: {
        schedules: {
          title: req.body.title,
          date: req.body.date,
          color: req.body.color,
        },
      },
    });
    res.status(200).send({
      message: "event data Recieved",
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting user info", success: false, error });
  }
};

//remove evnt
const removeEvent = async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(req.body.userId, {
      $pull: { schedules: { _id: req.body.eventId } },
    });

    res.status(200).send({
      message: "event deletde succefully",
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting user info", success: false, error });
  }
};

const uploadImage = async (req, res) => {
  try {
    console.log("first");
    const image = req.body.image;
    const imageUpload = await cloudinary.uploader.upload(image, opts);
    await User.findByIdAndUpdate(req.body.userId, {
      profile: imageUpload.secure_url,
    });
    res
      .status(200)
      .send({ message: "Profile updated succesfully ", success: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  postRegister,
  postLogin,
  getUserData,
  editUserById,
  getChatHistory,
  addEvent,
  removeEvent,
  uploadImage,
};
