import React, { useState } from "react";
import { useLocation } from "react-router";
import Button from "../components/ui/Button.jsx";
import { useAuthContext } from "../context/AuthContext.jsx";
import { addOrUpdateToCart } from "../api/firebase.js";

function ProductDetail() {
  const { uid } = useAuthContext();
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const [selected, setSelected] = useState(options && options[0]);

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const handleClick = (e) => {
    const product = { id, image, title, price, option: selected, quantity: 1 };
    return addOrUpdateToCart(uid, product);
  };

  return (
    <>
      <p className="mx-12 mt-4 text-gray-700">{category}</p>
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
          <Button text="Add to Cart" onClick={handleClick} />
        </div>
      </section>
    </>
  );
}
export default ProductDetail;
