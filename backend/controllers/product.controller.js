import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const sellerId = req.user._id;

    const products = await Product.find({ seller: sellerId });
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, images, category } = req.body;
    
    const product = await Product.create({
      name,
      description,
      price,
      category,
      images,
      seller: req.user,
    });

    res.status(201).json({ product, message: "New product added" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadImage = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: 'No files provided' });
    }

    const uploadedImageUrls = [];
    // Upload each file to Cloudinary
    const uploadPromises = req.files.map(file =>
      cloudinary.uploader.upload(file.path, {
        folder: 'products'
      })
    );

    const result = await Promise.all(uploadPromises);

    result.forEach(r => {
      uploadedImageUrls.push(r.secure_url);
    });
    res.status(200).json({ images: uploadedImageUrls });
  } catch (error) {
    res.status(500).json({ message: "Only jpg, jpeg, png, gif formats are supported " });    
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.images && product.images.length > 0) {
      try {
        for (const imageUrl of product.images) {
          const publicId = imageUrl.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(`products/${publicId}`);
        }
      } catch (error) {
        console.log(error);
        
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProductsBySearch = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    console.log(searchTerm);
    
    const regex = new RegExp(searchTerm, 'i', 'g');

    const searchResult = await Product.find({ 
      "$or" : [
        {
          name: regex
        },
        {
          category: regex
        }
      ]
    });

    if(!searchResult){
      return res.status(404).json({ message: "No data found"});
    }
    
    res.status(200).json({searchResult});
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message});
  }
};

export const getSelectedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if(!product){
      res.status(404).json({ message: "Product not found"});
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};
