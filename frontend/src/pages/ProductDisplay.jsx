import React, { useState } from "react";
import { logo } from "../assets";
import { useSelector } from "react-redux";

const ProductDisplay = () => {
  const { selectedProduct } = useSelector((state) => state.product);
  const [mainImage, setMainImage] = useState(selectedProduct?.images[0] || "");
  console.log(mainImage);

  return (
    <>
      <div className="relative xl:h-[97vh] h-screen xl:w-[65vw] w-screen xl:border border-[rgba(255,255,255,0.2)] xl:rounded-lg bg-[#141414] backdrop-blur-md flex xl:flex-row flex-col xl:items-center">
        <div className="absolute top-100 w-full h-screen leading-[60.75px] bg-[radial-gradient(ellipse_at_bottom,rgba(121,12,105,0.129)_0%,rgba(13,5,28,0)_85%)]" />
        <div className="overflow-scroll xl:w-36 w-full xl:h-full h-36 flex xl:flex-col flex-row xl:items-center justify-between lg:p-4 p-1">
          {selectedProduct?.images?.map((image, index) => (
            <img
              src={image}
              key={index}
              alt="image"
              className="h-32 rounded object-cover cursor-pointer z-10"
              onClick={() =>setMainImage(image)}
            />
          ))}
        </div>
        <img
          src={mainImage || selectedProduct?.images[0]}
          alt="image"
          className="h-[78%] w-[90vh] lg:mt-5 object-contain mx-auto"
        />
      </div>
      <div className="relative xl:h-[97vh] h-screen xl:w-[30vw] w-screen xl:border border-[rgba(255,255,255,0.2)] xl:rounded-lg bg-[#141414] backdrop-blur-md flex flex-col p-5 text-sm">
        <div className="absolute top-100 w-full h-screen leading-[60.75px] bg-[radial-gradient(ellipse_at_bottom,rgba(121,12,105,0.129)_0%,rgba(13,5,28,0)_85%)]" />
        <img src={logo} alt="logo" className="w-14 h-14 mb-6 mx-auto" />
        <h1 className="text-center text-3xl mb-4 font-thin">
          {selectedProduct.name}
        </h1>
        <p className="text-justify mb-8 text-[#BCBCBC] ">
          {selectedProduct.description}
        </p>
        <p className="text-[#BCBCBC]">{selectedProduct.category}</p>
        <p className="text-[#BCBCBC] mt-3">₹{selectedProduct.price}</p>
      </div>
    </>
  );
};

export default ProductDisplay;
