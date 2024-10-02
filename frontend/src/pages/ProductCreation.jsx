import React, { useState } from "react";
import { motion } from "framer-motion";
import { category } from "../constatnts/constants";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { create } from "../assets";
import { Upload, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../store/productSlice";
import axios from "../lib/axios";

const ProductCreation = () => {
  const { loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [uploades, setUploades] = useState([]);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: [],
  });

  const handleFileChange = (e) => {
    if (e.target.files.length > 4) {
      toast.error("You can only upload a maximum of 4 images");
    } else {
      setUploades(e.target.files);
    }
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    if (uploades.length === 0){
      return toast.error("Select atleast 1 image");
    }
    const formData = new FormData();
    for (let i = 0; i < uploades.length; i++) {
      formData.append("images", uploades[i]);
    }

    try {
      const response = await axios.post("/products/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const urls = response.data.images;
      urls.forEach(r => {
        productData.images.push(r);
      });
      toast.success("Images uploaded. Click create now");
    } catch (error) {
      toast.error("Error uploading images:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if( productData.images.length === 0){
      return toast.error("You have to upload the selected images first");
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post("/products/create", productData);
      dispatch(setLoading(false));
      toast.success(res.data.message);
      setProductData({
        name: "",
        description: "",
        price: "",
        category: "",
        images: [],
      });
      setUploades([]);
    } catch (error) {
      dispatch(setLoading(false));
      toast.error(
        error?.response?.data?.message ||
          "An error occured during product creation"
      );
    }
  };

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
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
          Add New Product
        </h2>
      </motion.div>
      <motion.form
        className="mt-8 flex flex-col gap-3 sm:w-96 w-[90vw] mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <InputField
          type="text"
          name="name"
          value={productData.name}
          placeholder="Product Name"
          onChange={handleChange}
          required
        />
        <InputField
          type="number"
          name="price"
          value={productData.price}
          placeholder="Product Price"
          onChange={handleChange}
          required
        />
        <select
          type="text"
          name="category"
          value={productData.category}
          placeholder="Product Category"
          onChange={handleChange}
          required
          className="bg-[#292929] px-6 py-2 placeholder:text-[#464647] text-[#BCBCBC] rounded-xl outline-none border-none font-medium "
        >
          <option value="">Select a category</option>
          {category.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
        <textarea
          rows={4}
          name="description"
          placeholder="Product Description"
          value={productData.description}
          onChange={handleChange}
          required
          className="bg-[#292929] px-6 py-2 placeholder:text-[#464647] text-[#BCBCBC] rounded-xl outline-none border-none font-medium"
        />
        <div className="flex items-center">
          <input
            type="file"
            id="image"
            className="sr-only"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          <label
            htmlFor="image"
            className="cursor-pointer bg-[#292929] flex-1 rounded-xl text-sm font-medium text-[#464647] hover:bg-[#363636] outline-none border-none px-6 py-2 flex items-center justify-center gap-2 mr-2"
          >
            <Upload className="h-5 w-5 inline-block" />
            Select Image
          </label>
          <UploadCloud onClick={uploadImage} className="cursor-pointer" />
          <span className="ml-3 text-sm text-gray-400">
            {` ${uploades.length} Selected`}{" "}
          </span>
        </div>
        <Button
          name={loading ? "Creating..." : "Create"}
          icon={create}
          type="button"
          onClick={handleSubmit}
        />
      </motion.form>
    </div>
  );
};

export default ProductCreation;
