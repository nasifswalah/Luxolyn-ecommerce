import { redis } from '../lib/redis.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../models/user.model.js';
import { generateTokens, setCookies, storeRefreshToken } from '../utils/authentication.js';

dotenv.config();

export const signup = async (req, res)  => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });

        if ( userExists ) {
            return res.status(400).json({message: " User already exists"});
        };
        
        const user = await User.create({ name, email, password });

        const { accessToken, refreshToken } = generateTokens(user._id);
        await storeRefreshToken(user._id, refreshToken);

        await setCookies(res, accessToken, refreshToken);

        res.status(201).json({ user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }, message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res)  => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if ( user && (await user.comparePassword(password))) {
            const { accessToken, refreshToken } = generateTokens(user._id);
            await storeRefreshToken(user._id, refreshToken);
            setCookies(res, accessToken, refreshToken);

            res.json({ user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }, message: "Logged in successfully"});
        } else {
           res.status(401).json({ message: "Invalid email or password"});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = async (req, res)  => {
   try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken){
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        await redis.del(`refresh_token:${decoded.userId}`);
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully"});
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
};

export const refreshAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token not provided" });
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

        if (storedToken !== refreshToken) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m"});

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });

        res.json({ message: "Token refreshed successfully"});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
