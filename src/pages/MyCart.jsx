import React from "react";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/firebase.js";
import CartItem from "../components/CartItem.jsx";

function MyCart() {
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery({
    queryKey: ["carts"],
    queryFn: () => getCart(uid),
  });

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;

  return (
    <section>
      <p>My Cart</p>
      {!hasProducts && <p>Shopping Cart is Empty. Keep it up!</p>}
      {hasProducts && (
        <>
          <ul>
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
          </ul>
          <div>
            <PriceCard text="Total" price={totalPrice} />
          </div>
        </>
      )}
    </section>
  );
}

export default MyCart;
