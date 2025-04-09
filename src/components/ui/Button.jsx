import React from "react";

function Button({ text, onClick, disabled, className = "" }) {
  return (
    <button
      className={`bg-brand text-white py-2 px-4 rounded-sm
      hover:brightness-130 duration-100 ease-in
      disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
