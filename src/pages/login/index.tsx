import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";

// import { http } from "@http";
import {login}from "@auth";
import "./style.scss";

const index = () => {
  // interface for users
  interface userInterface {
    username: string;
    password: string;
  }
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState<userInterface>({username: "", password: ""});

  // function input change----------------------
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // console.log(formData);
  };
  //==============================================

  // function form submit ----------------------------------------------------
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const errorMessage: userInterface = { username: "", password: "" };
    if (!formData.username.trim().length) {
      errorMessage.username = "Username is required";
    }
    if (!formData.password.trim().length) {
      errorMessage.password = "Password is required";
    } else if (formData.password.trim().length < 6) {
      errorMessage.password = "Password langth is less than 6";
    }

    setError(errorMessage);

    if (!errorMessage.username && !errorMessage.password) {
      try {
        const res = await login("/auth/login", formData);
        console.log(res);

        if (res.status === 201) {
          toast.success("User Added Successfully");
          localStorage.setItem("token", res?.data?.accessToken);
          setTimeout(() => {
            navigate("/home");
          },2000)
        }else if (res.status === 401){
          toast.error(res.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

 

  
  return (
    <>
      <div className="refister-wrapp w-full h-[100vh] flex items-center justify-center">
        <div className=" max-w-[700px] w-full border rounded-3xl bg-transparent py-7 px-5 flex flex-col items-center justify-center">
          <h1 className="text-[24px] text-white mb-3">Foorm Login</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full"
          >
            <input
              name="username"
              onChange={handleChange}
              type="text"
              placeholder="Username"
              className=" w-[90%] mb-3 py-2 px-4 bg-transparent border  outline-none text-black text-[20px] placeholder:text-black rounded-lg focus:border-yellow-700"
            />
            {error && <p className="mb-3 text-red-500">{error.username}</p>}
            <input
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Password"
              className=" w-[90%] mb-3 py-2 px-4 bg-transparent border  outline-none text-black text-[20px] placeholder:text-black rounded-lg focus:border-yellow-700"
            />
            {error && <p className="mb-3 text-red-500">{error.password}</p>}
            <button className="w-[90%] bg-white rounded-lg py-2 px-3 text-[18px] text-cyan-600 hover:bg-slate-300 active:bg-white  duration-300 active:text-cyan-600">
              Submit
            </button>
          </form>
          <button
            onClick={() => navigate("/")}
            className=" mt-3 text-end text-sky-600 rounded-lg py-2 px-3 text-[18px] "
          >
            Forgot password?
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default index;
