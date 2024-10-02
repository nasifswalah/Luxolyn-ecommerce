import React, { useState } from "react";
import { motion } from "framer-motion";
import { FolderPlus, LibraryBig, User } from "lucide-react";
import Button from "../components/Button";
import { trash } from "../assets";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart, fetchProductsFailure, fetchProductsSuccess } from '../store/productSlice.js';
import toast from 'react-hot-toast';
import axios from '../lib/axios.js'

const Profile = () => {

  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const getMyProducts = async () => {
    dispatch(fetchProductsStart());
    try {
      const res = await axios.get('/products');
      dispatch(fetchProductsSuccess(res.data.products))
    } catch (error) {
      dispatch(fetchProductsFailure());
      toast.error(error.response.data.message || "Failed to fetch products");
    }
  };



  return (
    <div className="relative xl:h-[97vh] h-screen xl:w-[95vw] w-screen xl:border border-[rgba(255,255,255,0.2)] xl:rounded-lg bg-[#141414] backdrop-blur-md flex flex-col justify-center">
      <div className="absolute top-100 w-full h-screen leading-[60.75px] bg-[radial-gradient(ellipse_at_bottom,rgba(121,12,105,0.129)_0%,rgba(13,5,28,0)_85%)]" />
      <motion.div
        className="sm:w-96 w-[90vw] mx-auto p-5 bg-[rgba(61,27,56,0.24)] border border-[rgba(255,255,255,0.2)] text-[#EDEDED] rounded-lg flex flex-col gap-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <User className="w-20 h-20 mx-auto mb-1" />
        {user.role === "seller" && (
          <div className="flex justify-evenly gap-3 my-2">
            <Link to="/listing" className="flex flex-col items-center text-xs text-[#868686] hover:text-[#EDEDED] transition duration-300 ">
              <LibraryBig  onClick={getMyProducts} />
              Your Products
            </Link>
            <Link to="/create" className="flex flex-col items-center text-xs text-[#868686] hover:text-[#EDEDED] transition duration-300">
              <FolderPlus />
              Add New Product
            </Link>
          </div>
        )}
        <h1>Name: &nbsp; {user.name}</h1>
        <p>Email&nbsp;: &nbsp; {user.email}</p>
        <p>Role&nbsp;&nbsp;&nbsp;: &nbsp; {user.role}</p>
        
      </motion.div>
    </div>
  );
};

export default Profile;
