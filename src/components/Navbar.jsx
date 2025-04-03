import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { BsPencilFill } from "react-icons/bs";
import { login, logout, onUserStateChange } from "../api/firebase.js";
import User from "./User.jsx";
import Button from "./ui/Button.jsx";
import { useAuthContext } from "../context/AuthContext.jsx";

function Navbar() {
  const { user, login, logout } = useAuthContext();

  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to="/">
        <img src="/logo.png" alt="Shoppy" className="w-15 h-12 " />
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">Products</Link>
        {user && <Link to="/cart">Cart</Link>}
        {user && user.isAdmin && (
          <Link to="/products/new">
            <BsPencilFill />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <Button text={"Login"} onClick={login} />}
        {user && <Button text={"Logout"} onClick={logout} />}
      </nav>
    </header>
  );
}

export default Navbar;
