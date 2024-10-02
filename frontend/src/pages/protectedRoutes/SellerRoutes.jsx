import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const SellerRoutes = () => {


    // Destructuring the currentUser from user slice
    const { user} = useSelector((state) => state.user);
    
    return user.role === "seller" ? <Outlet/> : <Navigate to='/login'/>
} 

export default SellerRoutes