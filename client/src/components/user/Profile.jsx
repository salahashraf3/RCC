import React from "react";
import "./css/Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { showProfile } from "../../redux/userProfileSwitch";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import ProfileEdit from "./Profile/ProfileEdit";
import ChatHistory from "./ChatHistory/ChatHistory";
import useUserData from "./Hooks/useUserData";
import Schedule from "./Schedule/Schedule";

function Profile() {
  const userData = useUserData();
  const [rightSideData, setRightSideData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentTheme = useSelector((state) => state.themeSwitch.dark);

  //logout btn
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("profile");
    dispatch(showProfile());
    navigate("/");
  };

  return (
    <>
      {/* Navbar  */}
      {/* <div className="nav-bar d-flex justify-content-between align-items-center me-5">
        <div className="logo">
          <img
            src={require("./cover.png")}
            alt="test"
            width={"180px"}
            className="logo"
          />
        </div>
        <div className="profile">
          <Link onClick={()=> dispatch(showProfile())}>
            <FaUser className="User-logo" />
          </Link>
        </div>
      </div> */}
      {/* Navbar End */}

      {/* Section */}
      <div
        className={
          currentTheme
            ? `profile-main-container-dark`
            : `profile-main-container`
        }
      >
        <div className={currentTheme ? `profile-left-dark` : `profile-left`}>
          <div className="profile-btn">
            <Link
              onClick={() => dispatch(showProfile())}
              className="close-logo"
            >
              <IoMdClose />
            </Link>
          </div>
          <div className="profile-pic my-3">
            <img
              className="img-profile "
              src={userData.profile || localStorage.getItem("profile")}
              alt="User"
              srcset=""
            />
            <p>{userData?.name || localStorage.getItem("name")}</p>
          </div>
          <div className="items-list">
            <div className="test">
              <div className="list" onClick={() => setRightSideData("profile")}>
                <Link className="link">Profile Edit</Link>
              </div>
              <div
                className="list"
                onClick={() => setRightSideData("chatHistory")}
              >
                <Link className="link">Chat History</Link>
              </div>
              <div
                className="list"
                onClick={() => setRightSideData("Schedule")}
              >
                <Link className="link">Schedule</Link>
              </div>
            </div>
            <div className="logout-btn">
              <p className="btn btn-danger" onClick={handleLogout}>
                Logout
              </p>
            </div>
          </div>
        </div>
        <div className="profile-right">
          {rightSideData === "profile" ? (
            <ProfileEdit />
          ) : rightSideData === "chatHistory" ? (
            <ChatHistory />
          ) : rightSideData === "Schedule" ? (
            <Schedule />
          ) : (
            ""
          )}
        </div>
      </div>
      {/* Section End*/}
    </>
  );
}

export default Profile;
