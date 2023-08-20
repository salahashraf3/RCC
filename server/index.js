const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const jwt = require("jsonwebtoken");
const PORT = 5000;
const path = require("path");
const chatHistoryModel = require("./model/chatHistory");
const { ObjectId } = require("mongodb");
const User = require("./model/userModel");
var CronJob = require("cron").CronJob;

//env config
require("dotenv").config();
//db import
const dbConfig = require("./config/dbConfig");

//cors active
const cors = require("cors");
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

let socketList = {};

app.use(express.static(path.join(__dirname, "public")));

// Socket
io.on("connection", (socket) => {
  console.log(`New User connected: ${socket.id}`);

  socket.on("check-notifications", ({ userId }) => {
    let Userdata;
    jwt.verify(userId, process.env.JWT_Secret, async (err, data) => {
      Userdata = await User.findById(data.id);
    });

    var job = new CronJob(
      "* * * * * *",
      () => {
        let schedules = Userdata?.schedules;
        if (schedules) {
          schedules.forEach((element) => {
            let todayDate = new Date();
            let date = new Date(element.date);
            if (todayDate == date) {
              socket.emit("send-notifications", { data: element });
            }
          });
        }
      },
      true,
      "Asia/Kolkata"
    );
  });

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("User disconnected!");
  });

  socket.on("Check-room-exist", ({ roomId }) => {
    let roomExist = false;
    if (io.sockets.adapter.rooms[roomId]) {
      roomExist = true;
    }
    socket.emit("room-exist", { roomExist });
  });

  socket.on("BE-check-user", ({ roomId, userName }) => {
    let error = false;

    io.sockets.in(roomId).clients((err, clients) => {
      clients.forEach((client) => {
        let lient = socketList[client];
        if (lient.userName == userName) {
          error = true;
        }
      });
      socket.emit("FE-error-user-exist", { error });
    });
  });

  /**
   * Join Room
   */
  socket.on("BE-join-room", ({ roomId, userName }) => {
    // Socket Join RoomName
    socket.join(roomId);

    socketList[socket.id] = { userName, video: true, audio: true };

    // Set User List
    io.sockets.in(roomId).clients((err, clients) => {
      try {
        const users = [];
        clients.forEach((client) => {
          // Add User List
          users.push({ userId: client, info: socketList[client] });
        });
        socket.broadcast.to(roomId).emit("FE-user-join", users);
        // io.sockets.in(roomId).emit('FE-user-join', users);
      } catch (e) {
        io.sockets.in(roomId).emit("FE-error-user-exist", { err: true });
      }
    });
  });

  socket.on("BE-call-user", ({ userToCall, from, signal }) => {
    io.to(userToCall).emit("FE-receive-call", {
      signal,
      from,
      info: socketList[socket.id],
    });
  });

  socket.on("BE-accept-call", ({ signal, to }) => {
    io.to(to).emit("FE-call-accepted", {
      signal,
      answerId: socket.id,
    });
  });

  socket.on("BE-send-message", async ({ roomId, msg, sender, userId }) => {
    const roomExist = await chatHistoryModel.findOne({ roomId: roomId });
    if (roomExist) {
      await chatHistoryModel.findByIdAndUpdate(roomExist._id, {
        $push: {
          history: {
            userName: sender,
            userId: new ObjectId(userId),
            chat: msg,
            time: Date.now(),
          },
        },
      });
    } else {
      const data = new chatHistoryModel({
        roomId: roomId,
        history: [
          {
            userName: sender,
            userId: new ObjectId(userId),
            chat: msg,
            time: Date.now(),
          },
        ],
      });
      await data.save();
    }
    io.sockets.in(roomId).emit("FE-receive-message", { msg, sender });
  });

  socket.on("BE-leave-room", ({ roomId, leaver }) => {
    delete socketList[socket.id];
    socket.broadcast.to(roomId).emit("FE-user-leave", {
      userId: socket.id,
      userName: [socket.id],
      leaver,
    });
    io.sockets.sockets[socket.id].leave(roomId);
  });

  socket.on("BE-toggle-camera-audio", ({ roomId, switchTarget }) => {
    if (switchTarget === "video") {
      socketList[socket.id].video = !socketList[socket.id].video;
    } else {
      socketList[socket.id].audio = !socketList[socket.id].audio;
    }
    socket.broadcast
      .to(roomId)
      .emit("FE-toggle-camera", { userId: socket.id, switchTarget });
  });

  socket.on("enter-html", ({ value, roomId }) => {
    socket.broadcast.to(roomId).emit("save-html", { value });
  });
  socket.on("enter-css", ({ value, roomId }) => {
    socket.broadcast.to(roomId).emit("save-css", { value });
  });
  socket.on("enter-js", ({ value, roomId }) => {
    socket.broadcast.to(roomId).emit("save-js", { value });
  });

  socket.on("get-users-list", ({ roomId }) => {
    console.log(roomId);
    // io.sockets.in(roomId).emit("FE-receive-message", { msg, sender });
    io.sockets.in(roomId).clients((err, clients) => {
      try {
        console.log(clients)
        const users = [];
        clients.forEach((client) => {
          // Add User List
          users.push(socketList[client].userName);
        });
        console.log(users);
        socket.emit("users-list", { users });
      } catch (e) {
        io.sockets.in(roomId).emit("FE-error-user-exist", { err: true });
      }
    });
  });
});

//import userContoller
const userRoute = require("./route/userRoute");
app.use("/api/user", userRoute);

http.listen(PORT, () => {
  console.log(`Connected : ` + PORT);
});
