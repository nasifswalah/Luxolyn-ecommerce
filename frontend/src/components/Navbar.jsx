import React from "react";
import {
  House,
  LogOut,
  Search,
  LibraryBig,
  LogIn,
  ShoppingCart,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { logo } from '../assets'
import { useDispatch, useSelector } from "react-redux";
import axios from '../lib/axios.js';
import { logOutFailure, logoutStart, logOutSuccess } from "../store/userSlice.js";
import toast from "react-hot-toast";
import { getCartItemsSuccess } from "../store/cartSlice.js";



const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
  if(!user){
    toast.error("Please login first", { id: "login"});
  }
}

  const getCartItems = async() => {
    try {
      const res = await axios.get('/cart');
      dispatch(getCartItemsSuccess(res.data));
      console.log(cart);
    } catch (error) {
      toast.error(error.response.data.message || "Failed to fetch cart items");
    }
  };

  const logOut = async() => {
    handleClick();
      try {
        dispatch(logoutStart())
        const data = await axios.post('/auth/logout');
        dispatch(logOutSuccess());
        toast.success(data.data.message);
        navigate('/');
      } catch (error) {
        dispatch(logOutFailure());
        toast.error(error?.response?.data?.message || "An error occured during logout");
      }
  }


  return (
 
    <>
    <div className="relative backdrop-blur-[920px] xl:h-[97vh] h-[80px] xl:w-[5vw] w-[100vw] xl:border border-[rgba(255,255,255,0.2)] xl:rounded-lg bg-[#141414] flex xl:flex-col flex-row justify-center xl:justify-normal items-center xl:gap-5 gap-[10%] xl:pt-5 z-10 ">
        <img src={logo} alt="logo" className="w-9 h-9 xl:mb-3" />
      

      <Link to="/">
        <House className="text-[#464646] w-6 h-6 hover:text-[#868686] transition duration-300" />
      </Link>
      <Link to="/search">
        <Search className="text-[#464646] w-6 h-6 hover:text-[#868686] transition duration-300" />
      </Link>
      <Link to="/cart">
        <ShoppingCart className="text-[#464646] w-6 h-6 hover:text-[#868686] transition duration-300" onClick={getCartItems} /> 
      </Link>
      <Link to="/profile">
        <User className="text-[#464646] w-6 h-6 hover:text-[#868686] transition duration-300" onClick={handleClick} />
      </Link>
      {user ? (
          <LogOut className="text-[#464646] w-6 h-6 hover:text-[#868686] transition duration-300 cursor-pointer" onClick={logOut} />
      ) : (
        <Link to="/login">
          <LogIn className="text-[#464646] w-6 h-6 hover:text-[#868686] transition duration-300" />
        </Link>
      )}
    </div>
    </>
  );
};

export default Navbar;
