import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertsSlice";
import { request } from "../axios";
import { useNavigate } from "react-router-dom";

function useUserData() {
  const [userData, setUserdata] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  //get user data
  const getData = async () => {
    dispatch(showLoading());

    request({
      url: "/api/user/getUserDataById",
      method: "post",
    })
      .then((data) => {
        if (data.data.success) {
          setUserdata(data.data.data);
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

  return userData;
}

export default useUserData;
