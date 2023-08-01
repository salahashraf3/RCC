import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../../redux/alertsSlice";
import { request } from "../axios";
import useUserData from "../Hooks/useUserData";
import { toast } from "react-hot-toast";

function ProfileEdit() {
  const userData = useUserData();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handle user edit
  const handleUserEdit = async (e) => {
    e.preventDefault();
    dispatch(showLoading());

    request({
      url: "/api/user/editUserById",
      method: "post",
      data: {
        name: e.target.name.value ? e.target.name.value : userData.name,
        email: e.target.email.value ? e.target.email.value : userData.email,
      },
    })
      .then((data) => {
        if (data.data.success) {
          toast("Updated Succefully!", {
            icon: "👍",
          });
        } else if (data.data.success === false) {
          localStorage.clear();
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));

    dispatch(hideLoading());
  };

  return (
    <form onSubmit={handleUserEdit}>
      <label htmlFor="Email" className="my-3">
        Name
      </label>
      <div className="form-outline inputdiv">
        <input
          name="name"
          type="text"
          id="form12"
          className="form-control"
          placeholder={userData.name}
        />
      </div>
      <label htmlFor="Email" className="my-3">
        Email
      </label>
      <div className="form-outline inputdiv">
        <input
          name="email"
          type="text"
          id="form12"
          className="form-control"
          placeholder={userData.email}
        />
      </div>
      <button className="btn btn-primary mt-4" type="submit">
        Edit
      </button>
    </form>
  );
}

export default ProfileEdit;
