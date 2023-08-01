import React, { useEffect, useState } from "react";
import "../css/ChatHistory.css";
import { request } from "../axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertsSlice";
import { useNavigate } from "react-router-dom";

function ChatHistory() {
  const [chatData, setChatData] = useState([]);
  const [currentUserId, setCurrentUserId] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    dispatch(showLoading());

    request({
      url: "/api/user/getChatHistory",
      method: "post",
    })
      .then((data) => {
        if (data.data.success) {
          console.log(data.data.userId);
          setCurrentUserId(data.data.userId);
          setChatData(data.data.data);
        } else if (data.data.success === false) {
          localStorage.clear();
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
    dispatch(hideLoading());
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div class="container-chat">
        {chatData.map((data) => {
          return (
            <>
              {data.history.map((hist) => {
                return (
                  <>
                    <div class="chat-container">
                      <ul class="chat">
                        {currentUserId == hist.userName ? (
                          <>
                            <h5>
                              {hist.userName}{" "}
                              <small className="time">
                                {hist.time.slice(11, 16)}
                              </small>
                            </h5>
                            <li className="message left">
                              <p>{hist.chat}</p>
                            </li>
                          </>
                        ) : (
                          <>
                            <h5 className="float-right">
                              {hist.userName}
                              <small className="time">
                                {hist.time.slice(11, 16)}
                              </small>
                            </h5>

                            <li className="message right">
                              <p>{hist.chat}</p>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </>
                );
              })}
            </>
          );
        })}
      </div>
    </>
  );
}

export default ChatHistory;
