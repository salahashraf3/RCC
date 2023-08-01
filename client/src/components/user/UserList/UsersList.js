import React, { useEffect, useState, useRef } from "react";
import socket from "../../../socket";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import "../css/UsersList.css";
import { showUsers } from "../../../redux/usersListSectionSlice";
import { useParams } from "react-router-dom";

function UsersList() {
  const [user, setUsers] = useState([]);
  const dispatch = useDispatch();
  const roomId = useParams().roomID;

  useEffect(() => {
    socket.emit("get-users-list", { roomId });
  }, []);

  socket.on("users-list", ({ users }) => {
    setUsers(users);
  });

  return (
    <div className="user-list-main-container">
      <IoMdClose onClick={() => dispatch(showUsers())} className="close-icon" />
      <div class="container bootdey mt-5">
        <div class="row">
          {user.map((value) => {
            return (
              <div class="col">
                <div class="user-widget-2">
                  <ul class="list-unstyled">
                    <li class="media d-flex ">
                      <img
                        class="rounded-circle d-flex align-self-center"
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt=""
                      />

                      <div class="media-body mt-3 ms-3">
                        <h5>{value}</h5>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UsersList;
