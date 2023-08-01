import React from "react";
import "./css/Login.css";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import { request } from "./axios.js";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import axios from "axios";

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


      const response = await axios.post("/api/user/login",{
        email: e.target.email.value,
          password: e.target.password.value,
      })

      if (response.data.success) {
            toast.success(response.data.message);
            localStorage.setItem("token", response.data.token);
            navigate("/");
          } else {
            toast.error(response.data.message);
          }


      // request({
      //   url: "/api/user/login",
      //   method: "post",
      //   data: {
      //     email: e.target.email.value,
      //     password: e.target.password.value,
      //   },
      // }).then((data) => {
      //   if (data.data.success) {
      //     toast.success(data.data.message);
      //     localStorage.setItem("token", data.data.token);
      //     navigate("/");
      //   } else {
      //     toast.error(data.data.message);
      //   }
      // }).catch(err=>console.log(err))
      dispatch(hideLoading());
    }
  };
  return (
    <>
      <div className="main-Container">
        <div className="Container">
          <div className="heading mb-4 d-flex justify-content-between align-items-center">
            <h2>Login</h2>
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "black" }}
            >
              <FaUser />
            </Link>
          </div>
          <div className="form">
            <form onSubmit={handleSubmit}>
              {/* email */}
              <div class="input-group mb-3 mt-5">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon1"
                  name="email"
                />
              </div>

              {/* password */}
              <div class="input-group mb-3 mt-5">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Passwrod"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  name="password"
                />
              </div>
              <div className="button d-flex justify-content-end mt-4">
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
