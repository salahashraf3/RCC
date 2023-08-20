import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../../redux/alertsSlice";
import { request } from "../axios";
import useUserData from "../Hooks/useUserData";
import { toast } from "react-hot-toast";
import axios from "axios";
import { request } from "../axios";

function ProfileEdit() {
  const userData = useUserData();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadSingleImage = async (base64) => {
    dispatch(showLoading());

    // const response = await axios.post(
    //   "/api/user/uploadImage",
    //   {
    //     image: base64,
    //   },
    //   {
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("token"),
    //     },
    //   }
    // );

    request({
      url: "/api/user/uploadImage",
      method: "post",
      data: {
        image: base64
      }
    }).then((data) => {
      dispatch(hideLoading());
      if (data.data.success) {
        navigate("/")
        toast.success("profile updated successfully")
      } else {
        console.log("errororr", data);
        toast.error("Error")
      }
    }).catch((err)=>{
      console.log(err)
       toast.error("errorr")
      })

    if (response.data.success) {
      navigate("/")
      toast.success("profile updated successfully")
    } else {
      console.log("errororr");
    }
  };

  const uploadImage = async (event) => {
    const files = event.target.files;

    if (files.length === 1) {
      const base64 = await convertBase64(files[0]);
      uploadSingleImage(base64);
      return;
    }
  };

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
      <label htmlFor="Email" className="my-3">
        Profile edit
      </label>
      <div className="form-outline inputdiv">
        <input type="file" onChange={uploadImage} />
      </div>
      <button className="btn btn-primary mt-4" type="submit">
        Edit
      </button>
    </form>
  );
}

export default ProfileEdit;
