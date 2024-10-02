import { ShoppingCart } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../lib/axios.js';
import { setSelectedProduct } from '../store/productSlice.js';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {

    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFetchSelectedProduct = async (productId) => {
        try {
            const res = await axios.get(`/products/selected/${productId}`);
            dispatch(setSelectedProduct(res.data.product));        
            navigate('/view');
        } catch (error) {
            toast.error(error.response.data.message || "Failed fetch selected product");
        }
    };

    const handleAddToCart = async (e) => {
        e.preventDefault();
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		} else {
            try {
                const res = await axios.post('/cart', { productId : product._id});
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message || "Failed to add into cart");
            }
		}
	};
  return (
    <div className='flex w-full relative flex-col overflow-hidden rounded-lg border border-[rgba(255,255,255,0.2)] bg-[rgba(61,27,56,0.24)] shadow-lg'>
			<div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl ' onClick={() => handleFetchSelectedProduct(product._id)}>
				<img className='object-cover w-full' src={product.images[0]} alt='product image'  />
				<div className='absolute inset-0 bg-black bg-opacity-20' />
			</div>

			<div className='mt-4 px-5 pb-5'>
				<h5 className='text-xl font-semibold tracking-tight text-white'>{product.name}</h5>
				<div className='mt-2 mb-5 flex items-center justify-between'>
					<p>
						<span className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#833991] to-[#CE5ED5]'>₹{product.price}</span>
					</p>
				</div>
				<button
					className='flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-center text-sm font-medium
					 text-black hover:bg-[#a16bacc4] hover:text-white '
					onClick={handleAddToCart}
				>
					<ShoppingCart size={22} className='mr-2 text-black ' />
					Add to cart
				</button>
			</div>
		</div>
  )
}

export default ProductCard
