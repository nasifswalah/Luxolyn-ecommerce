import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model.js';

dotenv.config();

export const protectRoute = async ( req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if(!accessToken) {
            return res.status(401).json({ message: 'Unauthorized - no access token provided'});
        }

        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded.userId).select("-password");

            if(!user) {
                return res.status(401).json({ message: "Unauthorized - user not found"});
            };

            req.user = user;

            next();
        } catch (error) {
            if( error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Unauthorized - Access token expired" });
            }
            throw error
        }
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized - Invalid access token'});
    }
};

export const sellerRoute = (req, res, next) => {
    if(req.user && req.user.role === "seller"){
        next();
    } else {
        return res.status(403).json({ message: " Access denied - Seller only"});
    }
};