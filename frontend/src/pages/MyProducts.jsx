import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Trash } from "lucide-react";
import { deleteProductFailure, deleteProductStart, deleteProductSuccess } from "../store/productSlice";
import axios from '../lib/axios.js';
import toast from "react-hot-toast";

const MyProducts = () => {

  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const deleteProduct = async (productId) => {
    try {
      dispatch(deleteProductStart());
      const res = await axios.delete(`/products/delete/${productId}`);
      const currentProducts = products.filter(product => product._id !== productId);
      dispatch(deleteProductSuccess(currentProducts));
      toast.success(res.data.message);
    } catch (error) {
      dispatch(deleteProductFailure());
      toast.error(error.response.data.message || "Failed to delete product");
    }
  };

  return (
    <div className="relative xl:h-[97vh] h-screen xl:w-[95vw] w-screen xl:border border-[rgba(255,255,255,0.2)] xl:rounded-lg bg-[#141414] backdrop-blur-md flex flex-col justify-center">
      <div className="absolute top-100 w-full h-screen leading-[60.75px] bg-[radial-gradient(ellipse_at_bottom,rgba(121,12,105,0.129)_0%,rgba(13,5,28,0)_85%)]" />
      
      <motion.div
			className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-5xl w-full mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<table className=' min-w-full divide-y divide-gray-700'>
				<thead className='bg-gray-700'>
					<tr>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Product
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Price
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Category
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Actions
						</th>
					</tr>
				</thead>

				<tbody className='bg-[#292929] divide-y divide-gray-700'>
					{products?.map((product) => (
						<tr key={product._id} className='hover:bg-gray-700'>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='flex items-center'>
									<div className='flex-shrink-0 h-10 w-10'>
										<img
											className='h-10 w-10 rounded-full object-cover'
											src={product.images[0]}
											alt={product.name}
										/>
									</div>
									<div className='ml-4'>
										<div className='text-sm font-medium text-white'>{product.name}</div>
									</div>
								</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='text-sm text-gray-300'>₹{product.price.toFixed(2)}</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='text-sm text-gray-300'>{product.category}</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
								<button
									onClick={() => deleteProduct(product._id)}
									className='text-red-400 hover:text-red-300'
								>
									<Trash className='h-5 w-5' />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</motion.div>
    </div>
  )
}

export default MyProducts
