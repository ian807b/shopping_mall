import React from "react";

function Button({ text, onClick }) {
  return (
    <button
      className="bg-brand text-white py-2 px-4 rounded-sm hover:brightness-130 duration-100 ease-in"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
