import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../api/firebase.js";
import { useAuthContext } from "../../context/AuthContext.jsx";

function Cart() {
  const { uid } = useAuthContext();
  const { data: products } = useQuery({
    queryKey: ["carts"],
    queryFn: () => getCart(uid),
  });

  return (
    <div className="relative">
      <IoCartOutline className="text-4xl" />
      {products && (
        <p className="w-6 h-6 text-center bg-brand text-white font-bold rounded-full absolute -top-1 -right-2">
          {products.length}
        </p>
      )}
    </div>
  );
}

export default Cart;
