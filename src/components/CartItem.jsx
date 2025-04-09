import React from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { addOrUpdateToCart, removeFromCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

export default function CartItem({
  product,
  product: { id, image, title, option, quantity, price },
}) {
  const { uid } = useAuthContext();

  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateToCart(uid, { ...product, quantity: quantity - 1 });
  };

  const handlePlus = () => {
    addOrUpdateToCart(uid, { ...product, quantity: quantity + 1 });
  };

  const handleDelete = () => {
    removeFromCart(uid, id);
  };

  return (
    <li className="flex justify-between items-center border-b border-gray-300 py-4 px-2">
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
          disabled={quantity < 2}
        >
          <IoRemoveCircleOutline />
        </button>
        <span className="font-bold w-6 text-center">{quantity}</span>
        <button
          onClick={handlePlus}
          className="text-2xl text-gray-500 hover:text-brand transition-colors"
        >
          <IoAddCircleOutline />
        </button>
        <button
          onClick={handleDelete}
          className="ml-4 text-2xl text-gray-500 hover:text-red-500 transition-colors"
        >
          <IoTrashOutline />
        </button>
      </div>
    </li>
  );
}
