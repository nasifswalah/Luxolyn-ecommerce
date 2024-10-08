import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true, 
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    images: {
        type: [String],
        required: [true, "Image is required"],
    },
    category: {
        type: String,
        required: true,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},{timestamps: true});


const Product = mongoose.model('Product', productSchema);

export default Product;