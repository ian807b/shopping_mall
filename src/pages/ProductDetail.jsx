import React, { useState } from "react";
import { useLocation } from "react-router";
import Button from "../components/ui/Button.jsx";
import { useAuthContext } from "../context/AuthContext.jsx";
import { addOrUpdateToCart, getCart } from "../api/firebase.js";
import { useQueryClient } from "@tanstack/react-query";

function ProductDetail() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const [selected, setSelected] = useState(options && options[0]);

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const handleClick = () => {
    if (!uid) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    setIsAdding(true);

    // First check if the product already exists in the cart
    getCart(uid)
      .then((cartItems) => {
        const existingItem = cartItems.find(
          (item) => item.id === id && item.option === selected
        );

        // If it exists, increment quantity, otherwise add as new with quantity 1
        const product = existingItem
          ? { ...existingItem, quantity: existingItem.quantity + 1 }
          : { id, image, title, price, option: selected, quantity: 1 };

        return addOrUpdateToCart(uid, product);
      })
      .then(() => {
        // Only invalidate the specific cart query
        queryClient.invalidateQueries(["carts", uid]);

        // Show success message
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      })
      .finally(() => {
        setIsAdding(false);
      });
  };

  return (
    <>
      <p className="mx-12 mt-4 text-gray-700">{category}</p>
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md max-w-md">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>{title}</strong> added to cart!
              </span>
            </div>
          </div>
        </div>
      )}
      <section className="flex flex-col md:flex-row p-4">
        <div className="w-full md:basis-7/12 px-4">
          <div className="w-full aspect-square overflow-hidden rounded-md bg-gray-100">
            <img
              className="w-full h-full object-contain"
              src={image}
              alt={title}
            />
          </div>
        </div>
        <div className="w-full md:basis-5/12 flex flex-col p-4">
          <h2 className="text-3xl font-bold py-2">{title}</h2>
          <p className="text-2xl font-bold py-2 border-b border-gray-400">
            ${price}
          </p>
          <p className="py-4 text-lg">{description}</p>
          <div className="flex items-center">
            <label className="font-bold" htmlFor="select">
              Options:
            </label>
            <select
              className="p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none"
              id="select"
              onChange={handleSelect}
              value={selected}
            >
              {options &&
                options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          </div>
          <Button
            text={isAdding ? "Adding..." : "Add to Cart"}
            onClick={handleClick}
            disabled={isAdding}
          />
        </div>
      </section>
    </>
  );
}
export default ProductDetail;
