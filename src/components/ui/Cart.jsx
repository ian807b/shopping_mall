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
    <div>
      <IoCartOutline />
      {products && <p>{products.length}</p>}
    </div>
  );
}

export default Cart;
