import Product from "../models/product.model.js";

export const getCartProducts = async (req, res) => {
    try {
        const products = await Product.find({ _id: {$in: req.user.cartItems}});

        const cartItems = products.map((product) => {
            const item = req.user.cartItems.find((cartItem) => cartItem.id === product.id);
            return { ...product.toJSON(), quantity: item.quantity };
        });

        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message});
    }
}

export const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;
        
        const existingItem = user.cartItems.find((item) => item.id === productId);
        if (existingItem){
            existingItem.quantity += 1
        } else {
            user.cartItems.push(productId);
        }
         await user.save();
        res.status(201).json({ message: "Added to cart"});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message});
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;
        
        if (productId){
            user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        } else {
            return res.status(404).json({ message: "Product not found"});
        }

        await user.save();
        res.status(201).json({ message: "Remove from cart"});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message});
    }
}

export const updateQuantity = async (req, res) => {
    try {
        const { id: productId } = req.params;
        const { quantity } = req.body;
        const user = req.user;
        const existingItem = user.cartItems.find((item) => item.id === productId);

        if(existingItem) {
            existingItem.quantity = quantity;
            await user.save();
            res.json(user.cartItems);
        } else {
            return res.status(404).json({ message: "Product not found"});
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message});
    }
}

