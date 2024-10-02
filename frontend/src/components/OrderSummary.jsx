
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const OrderSummary = () => {

	const { total } = useSelector((state) => state.cart);
  return (
    <motion.div
			className='space-y-4 rounded-lg border border-[rgba(255,255,255,0.2)] bg-[rgba(61,27,56,0.24)] sm:p-6 p-4'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<p className='text-xl font-semibold text-white '>Order summary</p>

			<div className='space-y-4'>
				<div className='space-y-2'>
					<dl className='flex items-center justify-between gap-4'>
						<dt className='text-base font-normal text-gray-300'>Total price</dt>
						<dd className='text-base font-medium text-white'>₹{total}</dd>
					</dl>
				</div>

				<motion.button
					className='flex w-full items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-[#a16bacc4] hover:text-white  '
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={() => toast.error("Development progress")}
				>
					Proceed to Checkout
				</motion.button>

				<div className='flex items-center justify-center gap-2'>
					<span className='text-sm font-normal text-gray-400'>or</span>
					<Link
						to='/'
						className='inline-flex items-center gap-2 text-sm font-medium bg-clip-text text-transparent bg-gradient-to-b from-[#833991] to-[#CE5ED5] '
					>
						Continue Shopping
					</Link>
				</div>
			</div>
		</motion.div>
  )
}

export default OrderSummary
