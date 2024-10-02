import React from 'react'
import CartItem from '../components/CartItem'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import EmptyCartUI from '../components/EmptyCartUI'
import OrderSummary from '../components/OrderSummary'


const Cart = () => {

  const { cart } = useSelector((state) => state.cart);

  return (
    <section className="relative xl:h-[97vh] h-screen xl:w-[95vw] w-screen xl:border border-[rgba(255,255,255,0.2)] xl:rounded-lg bg-[#141414] backdrop-blur-md flex px-4 py-2 gap-2 lg:flex-row flex-col">
        <div className="absolute top-100 w-full h-screen leading-[60.75px] bg-[radial-gradient(ellipse_at_bottom,rgba(121,12,105,0.129)_0%,rgba(13,5,28,0)_85%)]" />
        <motion.div
						className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						{cart.length === 0 ? (
							<EmptyCartUI />
						) : (
							<div className='space-y-6'>
								{cart.map((item) => (
									<CartItem key={item._id} item={item} />
								))}
							</div>
						)}
						{/* {cart.length > 0 && <PeopleAlsoBought />} */}
					</motion.div>

					{cart.length > 0 && (
						<motion.div
							className='mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 w-full'
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<OrderSummary />
						</motion.div>
					)}
    </section>
  )
}

export default Cart;
