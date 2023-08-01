import React from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { request } from "./axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import axios from "axios";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle on register form submited
  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation

    let name = e.target.name.value;
    let email = e.target.email.value;
    let password = e.target.password.value;

    if (name.trim() === "") {
      toast.error("Name cannot be null");
    } else if (email.trim() === "") {
      toast.error("email cannot be null");
    } else if (password.trim() === "") {
      toast.error("password cannot be null");
    } else {
      dispatch(showLoading());

      const response = await axios.post("/api/user/register", {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      });
      if (response.data.success) {
            toast.success(response.data.message);
        navigate("/login");
          } else {
            toast.error(response.data.message);
          }

      // request({
      //   url: "/api/user/register",
      //   method: "post",
      //   data: {
      //     name: e.target.name.value,
      // email: e.target.email.value,
      // password: e.target.password.value,
      //   },
      // }).then((data) => {
      //   console.log(data.data)
      //   if (data.data.success) {
      //     toast.success(data.data.message);
      // navigate("/login");
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
        <div className="test"></div>
        <div className="Container">
          <div className="heading mb-4 d-flex justify-content-between align-items-center">
            <h2>Register</h2>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              <FaUser />
            </Link>
          </div>
          <div className="form">
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="input-group mb-3 mt-5">
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Name"
                  aria-label="Name"
                  aria-describedby="basic-addon1"
                  name="name"
                />
              </div>

              {/* email */}
              <div className="input-group mb-3 mt-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon1"
                  name="email"
                />
              </div>

              {/* password */}
              <div className="input-group mb-3 mt-5">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Passwrod"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  name="password"
                />
              </div>
              <div className="button d-flex justify-content-end mt-4">
                <button className="btn btn-primary" type="submit">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
