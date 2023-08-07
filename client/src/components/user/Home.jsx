import React, { useEffect } from "react";
import "./css/Home.css";
import { FaRegUser, FaThemeco, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showProfile } from "../../redux/userProfileSwitch";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import socket from "../../socket";
import { switchTheme } from "../../redux/themeSlice";
import uniqid from "uniqid";
import useUserData from "./Hooks/useUserData";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";
import Notifications from "react-notifications-menu";

TimeAgo.addDefaultLocale(en);

function Home() {
  const [notificationData, setnotificationData] = useState([
    {
      message: "Test Notification",
      receivedTime: <ReactTimeAgo date={new Date()} locale="en-US" />,
    },
  ]);
  const userData = useUserData();
  const currentTheme = useSelector((state) => state.themeSwitch.dark);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const roomValue = useRef();

  // ROOM JOIN
  const handleJoin = (e) => {
    e.preventDefault();
    if (roomValue.current.value === "") {
      toast.error("Room name cannot be null");
    } else {
      socket.emit("Check-room-exist", { roomId: roomId });
      socket.on("room-exist", ({ roomExist }) => {
        if (!roomExist) {
          toast.error("Room does not exist");
        } else {
          const userName = userData.name;
          socket.emit("BE-check-user", { roomId, userName });
          socket.on("FE-error-user-exist", ({ error }) => {
            if (error) {
              toast.error("User already present in the room");
            } else {
              sessionStorage.setItem("user", userData.name);
              sessionStorage.setItem("userId", userData._id);

              navigate(`/room/${roomId}`);
            }
          });
        }
      });
    }
  };

  //create room
  const handleCreate = (e) => {
    e.preventDefault();
    const CroomId = uniqid(); //change to uniqid
    socket.emit("Check-room-exist", { roomId: CroomId });
    socket.on("room-exist", ({ roomExist }) => {
      if (roomExist) {
        toast.error("Room already exist");
      } else {
        sessionStorage.setItem("user", userData.name);
        sessionStorage.setItem("userId", userData._id);

        navigate(`/room/${CroomId}`);
      }
    });
  };

  useEffect(() => {
    socket.emit("check-notifications", {
      userId: localStorage.getItem("token"),
    });
    socket.on("send-notifications", ({ data }) => {
      console.log(data);
      setnotificationData([
        ...notificationData,
        {
          message: data.title,
          receivedTime: <ReactTimeAgo date={new Date()} locale="en-US" />,
        },
      ]);
    });

    socket.on("FE-receive-message", ({ msg, sender }) => {
      setnotificationData([
        ...notificationData,
        {
          message: `${sender} has send you a message`,
          receivedTime: <ReactTimeAgo date={new Date()} locale="en-US" />,
        },
      ]);
    });
  }, []);

  return (
    <div className={currentTheme ? "home-container-dark" : "home-container"}>
      {/* Navbar */}
      <div className="nav-bar d-flex justify-content-between align-items-center me-5">
        <div className="logo">
          <img
            src={require("./cover.png")}
            alt="test"
            width={"180px"}
            className="logo"
          />
        </div>
        <div className="profile">
          {/* <Link onClick={() => dispatch(switchTheme())}>
            <FaThemeco className="User-logo me-5" />
          </Link> */}
          <Link>
            <div className="notification-container">
              <Notifications
                classNamePrefix="okrjoy"
                width="250px"
                data={notificationData}
              />
            </div>
          </Link>
          <Link onClick={() => dispatch(showProfile())}>
            {currentTheme ? (
              <FaRegUser className="User-logo" />
            ) : (
              <FaUser className="User-logo" />
            )}
          </Link>
        </div>
      </div>
      {/* Navbar end */}

      {/* home */}
      <div className="body-container d-flex justify-content-around align-items-center mt-5 ">
        <div className="left-side mt-5 ">
          <input
            type="email"
            ref={roomValue}
            className="form-control room-input "
            onChange={(e) => setRoomId(e.target.value)}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
            name="roomValue"
            placeholder="Enter Room Id"
          />
          <div className="button-group mt-3 btn-home ">
            <button
              className="btn btn-primary btn-outline-light me-4 home-btn "
              onClick={handleJoin}
            >
              Join Room
            </button>
            <button
              className="btn btn-light btn-outline-primary "
              onClick={handleCreate}
            >
              Create Room
            </button>
          </div>
        </div>
        <div className="right-side  ">
          <img
            className="cpu"
            src={require("./computer.png")}
            alt="cpu logo"
            width={"380rem"}
          />
        </div>
      </div>
      {/* home end */}
    </div>
  );
}

export default Home;
