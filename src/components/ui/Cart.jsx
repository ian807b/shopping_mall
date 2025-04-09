import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../api/firebase.js";
import { useAuthContext } from "../../context/AuthContext.jsx";

function Cart() {
  const { uid } = useAuthContext();

  // Use both possible query keys
  const { data: products, isSuccess } = useQuery({
    queryKey: ["carts", uid],
    queryFn: () => getCart(uid),
    enabled: !!uid,
    // Add staleTime: 0 to ensure it always refetches when invalidated
    staleTime: 0,
    // Add refetchOnWindowFocus to ensure it updates when the window regains focus
    refetchOnWindowFocus: true,
  });

  // Count total items in cart (quantity matters)
  const totalItems =
    isSuccess && products
      ? products.reduce((sum, item) => sum + item.quantity, 0)
      : 0;

  return (
    <div className="relative">
      <IoCartOutline className="text-4xl" />
      {isSuccess && totalItems > 0 && (
        <p className="w-6 h-6 text-center bg-brand text-white font-bold rounded-full absolute -top-1 -right-2">
          {totalItems}
        </p>
      )}
    </div>
  );
}

export default Cart;
