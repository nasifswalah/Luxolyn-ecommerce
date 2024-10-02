import axios from "../lib/axios.js";
import { Minus, Plus, Trash } from "lucide-react";
import { setCartTotalAmount, updateCartItems } from "../store/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useEffect } from "react";

const CartItem = ({ item }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const totalSum = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    dispatch(setCartTotalAmount(totalSum)); 
  }, [cart]); 

  const updateQuantity = async (itemId, quantity) => {
    try {
      if (quantity === 0) {
        removeFromCart(itemId);
        return;
      }
      const res = await axios.put(`/cart/${itemId}`, { quantity });
      console.log(res.data);
      const currentProducts = cart.map((product) => {
        if (product._id === itemId) {
          return { ...product, quantity };
        }
        return product;
      });
      dispatch(updateCartItems(currentProducts));
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to upadate quantity"
      );
      console.log(error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(`/cart/`, { data: { productId } });
      const currentProducts = cart.filter(
        (product) => product._id !== productId
      );
      dispatch(updateCartItems(currentProducts));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message || "Failed to remove cart item");
    }
  };

  return (
    <div className="rounded-lg border p-4 shadow-sm border-[rgba(255,255,255,0.2)] bg-[rgba(61,27,56,0.24)] md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <div className="shrink-0 md:order-1">
          <img
            className="h-20 md:h-32 rounded object-cover"
            src={item.images[0]}
          />
        </div>
        <label className="sr-only">Choose quantity:</label>

        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center gap-2">
            <button
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
							 border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2
							  focus:ring-emerald-500"
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
            >
              <Minus className="text-gray-300" />
            </button>
            <p>{item.quantity}</p>
            <button
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
							 border-gray-600 bg-gray-700 hover:bg-gray-600 "
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
            >
              <Plus className="text-gray-300" />
            </button>
          </div>

          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#833991] to-[#CE5ED5]">
              ${item.price}
            </p>
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <p className="text-base font-medium text-white hover:text-emerald-400 hover:underline">
            {item.name}
          </p>
          <p className="text-sm text-gray-400">{item.description}</p>

          <div className="flex items-center gap-4">
            <button
              className="inline-flex items-center text-sm font-medium text-red-400
							 hover:text-red-300 hover:underline"
              onClick={() => removeFromCart(item._id)}
            >
              <Trash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
