import React from "react";
import "./css/Login.css";
import {  BsGoogle } from "react-icons/bs";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { request } from "./axios";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle user login
  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation
    let email = e.target.email.value;
    let password = e.target.password.value;

    if (email.trim() === "") {
      toast.error("email cannot be null");
    } else if (password.trim() === "") {
      toast.error("password cannot be null");
    } else {
      dispatch(showLoading());

      request({
        url: "/api/user/login",
        method: "post",
        data: {
          email: e.target.email.value,
          password: e.target.password.value,
        },
      })
        .then((data) => {
          dispatch(hideLoading());
          if (data.data.success) {
            toast.success(data.data.message);
            localStorage.setItem("token", data.data.token);
            navigate("/");
          } else {
            toast.error(data.data.message);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <div className="main-Container">
        <div className="login-block">
          <img src="/images/covercopy.png" alt="Scanfcode" height={"80px"} />
          <h1>Log into your account</h1>
          <form action="">
            {/* <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon">
                  <i class="fa fa-user ti-user me-3"></i>
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Your name"
                />
              </div>
            </div> */}

            {/* <hr class="hr-xs" /> */}

            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon">
                  <i class="fa fa-envelope ti-email me-3"></i>
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Your email address"
                />
              </div>
            </div>

            <hr class="hr-xs" />

            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon">
                  <i class="fa fa-lock ti-unlock me-3"></i>
                </span>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              class="btn btn-primary btn-block px-5 py-2 mt-5"
              type="submit"
            >
              Login
            </button>

            <div class="login-footer">
              <h6>Or login with</h6>
              <ul class="social-icons">
                <li>
                  <a class="linkedin" href="#">
                    <BsGoogle />
                  </a>
                </li>
              </ul>
            </div>
          </form>
        </div>
        <div class="login-links">
          <p class="text-center">
            Doesn't have an account?{" "}
            <a class="txt-brand" href="/register">
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
