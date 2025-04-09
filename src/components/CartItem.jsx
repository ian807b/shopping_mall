import React, { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { addOrUpdateToCart, removeFromCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

export default function CartItem({
  product,
  product: { id, image, title, option, quantity, price },
}) {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);

  const updateCart = async (newProduct) => {
    if (isUpdating) return;
    setIsUpdating(true);

    try {
      await addOrUpdateToCart(uid, newProduct);

      // Invalidate ALL possible query key patterns
      queryClient.invalidateQueries(["carts"]);
      queryClient.invalidateQueries(["carts", uid]);

      // Force a refetch of the cart data
      queryClient.refetchQueries(["carts"]);
      queryClient.refetchQueries(["carts", uid]);
    } catch (error) {
      console.error("Error updating cart:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleMinus = () => {
    if (quantity < 2) return;
    updateCart({ ...product, quantity: quantity - 1 });
  };

  const handlePlus = () => {
    updateCart({ ...product, quantity: quantity + 1 });
  };

  const handleDelete = async () => {
    if (isUpdating) return;
    setIsUpdating(true);

    try {
      await removeFromCart(uid, id);

      // Invalidate ALL possible query key patterns
      queryClient.invalidateQueries(["carts"]);
      queryClient.invalidateQueries(["carts", uid]);

      // Force a refetch of the cart data
      queryClient.refetchQueries(["carts"]);
      queryClient.refetchQueries(["carts", uid]);
    } catch (error) {
      console.error("Error removing from cart:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <li
      className={`flex justify-between items-center border-b border-gray-300 py-4 px-2 ${
        isUpdating ? "opacity-70" : ""
      }`}
    >
      <div className="flex items-center">
        <div className="w-24 h-24 mr-4 overflow-hidden rounded-lg bg-gray-100">
          <img
            className="w-full h-full object-contain"
            src={image}
            alt={title}
          />
        </div>
        <div>
          <p className="font-semibold text-lg">{title}</p>
          <p className="text-sm text-gray-500">Option: {option}</p>
          <p className="font-bold text-brand">${price}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleMinus}
          className="text-2xl text-gray-500 hover:text-brand transition-colors"
          disabled={quantity < 2 || isUpdating}
        >
          <IoRemoveCircleOutline />
        </button>
        <span className="font-bold w-6 text-center">{quantity}</span>
        <button
          onClick={handlePlus}
          className="text-2xl text-gray-500 hover:text-brand transition-colors"
          disabled={isUpdating}
        >
          <IoAddCircleOutline />
        </button>
        <button
          onClick={handleDelete}
          className="ml-4 text-2xl text-gray-500 hover:text-red-500 transition-colors"
          disabled={isUpdating}
        >
          <IoTrashOutline />
        </button>
      </div>
    </li>
  );
}
