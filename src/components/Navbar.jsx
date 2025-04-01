import React from "react";
import { Link, useNavigate } from "react-router";
import { BsPencilFill } from "react-icons/bs";

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to="/">
        <img src="/logo.png" alt="Shoppy" className="w-15 h-12 " />
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/products/new">
          <BsPencilFill />
        </Link>
        <button>Login</button>
      </nav>
    </header>
  );
}

export default Navbar;
