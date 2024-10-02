import { motion } from "framer-motion";

import InputField from "../components/InputField";
import Button from "../components/Button";
import { open } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authStart, authFailure, authSuccess } from "../store/userSlice.js";
import axios from "../lib/axios.js";
import toast from "react-hot-toast";

const SignUp = () => {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(authStart());
      if (formData.password !== formData.confirmPassword) {
        dispatch(authFailure());
        return toast.error("Passwords do not match");
      }
      const { confirmPassword, ...signupData } = formData;
      const res = await axios.post("/auth/signup", signupData);
      const data = res.data;
      dispatch(authSuccess(data.user));
      toast.success(data.message);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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
          Your Journey Begins Here
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
          name="name"
          required
          value={formData.name}
          placeholder="Your Name"
          onChange={handleChange}
        />
        <InputField
          type="email"
          name="email"
          required
          value={formData.email}
          placeholder="you@gmail.com"
          onChange={handleChange}
        />
        <InputField
          type="password"
          name="password"
          required
          value={formData.password}
          placeholder="••••••••"
          onChange={handleChange}
        />
        <InputField
          type="password"
          name="confirmPassword"
          required
          value={formData.confirmPassword}
          placeholder="••••••••"
          onChange={handleChange}
        />
        <p className="text-center text-xs text-[#BCBCBC]">
          One of us?{" "}
          <Link
            to="/login"
            className="bg-clip-text text-transparent bg-gradient-to-b from-[#833991] to-[#CE5ED5] ml-1"
          >
            Let’s get you back in!
          </Link>
        </p>
        <Button name={loading ? "Loading..." : "Sign up"} icon={open} />
      </motion.form>
    </div>
  );
};

export default SignUp;
