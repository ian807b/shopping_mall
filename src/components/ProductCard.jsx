import React from "react";

export default function ProductCard({
  product: { id, image, title, category, price },
}) {
  return (
    <li className="rounded-lg shadow-md overflow-hidden cursor-pointer">
      <div className="w-full h-120 overflow-hidden">
        <img className="w-full h-full object-cover" src={image} alt={title} />
      </div>
      <div className="mt-2 px-2 text-lg flex justify-between items-center">
        <h3 className="truncate">{title}</h3>
        <p>{`$${price}`}</p>
      </div>
      <p className="mb-2 px-2 text-gray-600">{category}</p>
    </li>
  );
}
