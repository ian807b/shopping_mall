import React from "react";

export default function PriceCard({ text, price }) {
  return (
    <div className="bg-gray-50 p-4 rounded-md text-center shadow-sm">
      <p className="text-lg font-bold text-gray-700">{text}</p>
      <p className="text-xl font-bold text-brand">${price.toFixed(2)}</p>
    </div>
  );
}
