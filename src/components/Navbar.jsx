import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { BsPencilFill } from "react-icons/bs";
import { login, logout, onUserStateChange } from "../api/firebase.js";
import User from "./User.jsx";

function Navbar() {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

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
        {user && <User user={user} />}
        {!user && <button onClick={login}>Login</button>}
        {user && <button onClick={logout}>Logout</button>}
      </nav>
    </header>
  );
}

export default Navbar;
