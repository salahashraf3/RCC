import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { request } from "./axios";
import PasswordStrengthBar from "react-password-strength-bar";
import firebase from "./Auth/firebaseAuth";

function Register() {
  const [password, setPassword] = useState();
  const [otp, setOtp] = useState();
  const [regusterBtn, setRegisterBtn] = useState("none");

  const [passwordCheck, setPasswordCheck] = useState("none");
  const [number, setNumber] = useState("");
  const [otpPage, setOtpPage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle on register form submited
  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation

    let name = e.target.name.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    let number = e.target.number.value;
    let cPassword = e.target.confirmPassword.value;

    if (name.trim() === "") {
      toast.error("Name cannot be null");
    } else if (number.trim().length < 10) {
      toast.error("Number is not 10 digits");
    } else if (number.trim() === "") {
      toast.error("Number is null");
    } else if (email.trim() === "") {
      toast.error("Email cannot be null");
    } else if (!email.includes("@")) {
      toast.error("Invalid email format.");
    } else if (password.trim() === "") {
      toast.error("password cannot be null");
    } else if (password.trim().length < 5) {
      toast.error("password must be more than 5 letters");
    } else if (cPassword.trim() === "") {
      toast.error("confirm password cannot be null");
    } else if (password.trim() !== cPassword.trim()) {
      toast.error("password does not match");
    } else {
      dispatch(showLoading());
      request({
        url: "/api/user/register",
        method: "post",
        data: {
          name: e.target.name.value,
          email: e.target.email.value,
          password: e.target.password.value,
          number: number
        },
      })
        .then((data) => {
          dispatch(hideLoading());
          if (data.data.success) {
            toast.success(data.data.message);
            navigate("/login");
          } else {
            toast.error(data.data.message);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    dispatch(showLoading());
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        setOtpPage(!otpPage);
        toast.success("User Validated");
        dispatch(hideLoading());
        const user = result.user;
        console.log("succeess");
        console.log(JSON.stringify(user));
        setRegisterBtn("");
      })
      .catch((error) => {
        dispatch(hideLoading());
        toast.error("Otp has inccrect please check");
      });
  };

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // onSignInSubmit();
          console.log("recaptchaVerifier");
        },
        defaultCountry: "IN",
      }
    );
  };

  const onPhoneverify = () => {
    try {
      dispatch(showLoading());

      configureCaptcha();
      const phoneNumber = "+91" + number;
      console.log(phoneNumber);
      if (number === "") {
        toast.error("Please enter a number");
      } else {
        setOtpPage(!otpPage);
        const appVerifier = window.recaptchaVerifier;
        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            dispatch(hideLoading());
            window.confirmationResult = confirmationResult;
            toast.success("OTP has been sent");
          })
          .catch((error) => {
            dispatch(hideLoading());
            toast.error("SMS Not send");
            console.log(error);
          });
      }
      dispatch(hideLoading());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {otpPage && (
        <div className="otp-container">
          <div className="otp-form">
            <form onSubmit={handleOtpSubmit}>
              <div class="form-group">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="fa fa-lock ti-unlock me-3"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter OTP"
                    name="otp"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </div>

              <button
                class="btn btn-primary btn-block px-5 py-2 mt-5"
                type="submit"
              >
                Verify
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="main-Container">
        <div className="login-block">
          <img src="/images/covercopy.png" alt="Scanfcode" height={"80px"} />
          <h1>Register Your account</h1>
          <form onSubmit={handleSubmit}>
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon">
                  <i class="fa fa-user ti-user me-3"></i>
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Your name"
                  name="name"
                />
              </div>
            </div>

            <hr class="hr-xs" />
            <div id="sign-in-button"></div>
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon">
                  <i class="fa fa-phone  me-3"></i>
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Your number"
                  name="number"
                  onChange={(e) => setNumber(e.target.value)}
                />
                <a
                  onClick={onPhoneverify}
                  style={{ textDecoration: "none", cursor: "pointer" }}
                >
                  Verify
                </a>
              </div>
            </div>

            <hr class="hr-xs" />

            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon">
                  <i class="fa fa-envelope ti-email me-3"></i>
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Your email address"
                  name="email"
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
                  class="form-control password-input"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordCheck("block")}
                  onBlur={() => setPasswordCheck("none")}
                  name="password"
                />
              </div>
            </div>
            <PasswordStrengthBar
              style={{ display: passwordCheck }}
              password={password}
            />
            <hr class="hr-xs" />

            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon">
                  <i class="fa fa-lock ti-unlock me-3"></i>
                </span>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Confirm your password"
                  name="confirmPassword"
                />
              </div>
            </div>

            <button
              class="btn btn-primary btn-block px-5 py-2 mt-5 "
              style={{ display: regusterBtn }}
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
        <div class="login-links">
          <p class="text-center">
            Already have an account?{" "}
            <a class="txt-brand" href="/login">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
