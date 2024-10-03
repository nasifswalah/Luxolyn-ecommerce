// import express from 'express';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
// import path from 'path'


// import authRoutes from './routes/auth.routes.js';
// import productRoute from './routes/product.route.js';
// import cartRoute from './routes/cart.route.js';


// import { connectDB } from './lib/db.js';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// const __dirname = path.resolve();

// app.use(express.json());
// app.use(cookieParser());

// app.use('/api/auth',authRoutes);
// app.use('/api/products', productRoute);
// app.use('/api/cart', cartRoute);

// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));

// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});
// }

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);

//     connectDB();
// });