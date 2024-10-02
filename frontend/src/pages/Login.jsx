import React, { useState } from "react";
import InputField from "../components/InputField";
import { motion } from "framer-motion";
import Button from "../components/Button";
import { login } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authFailure, authStart, authSuccess } from "../store/userSlice";
import toast from "react-hot-toast";
import axios from "../lib/axios.js";

const Login = () => {

  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(authStart());
      const res = await axios.post("/auth/login", formData);
      const data = res.data;
      dispatch(authSuccess(data.user));
      toast.success(data.message);
      setFormData({
        email: "",
        password: "",
      })
      navigate('/');
    } catch (error) {
      dispatch(authFailure());      
      toast.error(error?.response?.data?.message || "An error occured");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative xl:h-[97vh] h-screen xl:w-[95vw] w-screen xl:border border-[rgba(255,255,255,0.2)] xl:rounded-lg bg-[#141414] backdrop-blur-md flex flex-col justify-center">
      <div className="absolute top-100 w-full h-screen leading-[60.75px] bg-[radial-gradient(ellipse_at_bottom,rgba(121,12,105,0.129)_0%,rgba(13,5,28,0)_85%)]" />
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <h2 className="font-themeFont text-[#FAF9F6] sm:text-2xl text-xl text-center font-semibold">
          {" "}
          Let’s get you back in!{" "}
        </h2>
      </motion.div>
      <motion.form
        className="mt-8 flex flex-col gap-3 sm:w-96 w-[90vw] mx-auto"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <InputField
          type="text"
          name="email"
          value={formData.email}
          placeholder="you@gmail.com"
          onChange={handleChange}
        />
        <InputField
          type="password"
          name="password"
          value={formData.password}
          placeholder="••••••••"
          onChange={handleChange}
        />
        <p className="text-center text-xs text-[#BCBCBC]">
          New here?{" "}
          <Link
            to="/signup"
            className="bg-clip-text text-transparent bg-gradient-to-b from-[#833991] to-[#CE5ED5] ml-1"
          >
            Your Journey Begins Here
          </Link>
        </p>
        <Button name={ loading ? "Loading..." : "Login"} icon={login}  />
      </motion.form>
    </div>
  );
};

export default Login;
