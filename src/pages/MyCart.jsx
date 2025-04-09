import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/firebase.js";
import CartItem from "../components/CartItem.jsx";
import Button from "../components/ui/Button.jsx";
import { BsGeoAlt } from "react-icons/bs";

function MyCart() {
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery({
    queryKey: ["carts", uid],
    queryFn: () => getCart(uid),
    enabled: !!uid,
  });

  const [location, setLocation] = useState({
    country: "Canada",
    province: "BC",
  });
  const [taxRate, setTaxRate] = useState(0.12); // Default BC tax rate
  const [shippingCost, setShippingCost] = useState(10); // Default shipping

  const handleLocationChange = (e) => {
    const province = e.target.value;
    setLocation((prev) => ({ ...prev, province }));

    switch (province) {
      case "BC":
        setTaxRate(0.12);
        break;
      case "AB":
        setTaxRate(0.05);
        break;
      case "ON":
        setTaxRate(0.13);
        break;
      default:
        setTaxRate(0.1);
    }

    if (province === "BC") {
      setShippingCost(10);
    } else if (["AB", "WA"].includes(province)) {
      setShippingCost(15);
    } else {
      setShippingCost(20);
    }
  };

  const calculatePrice = (products) => {
    if (!products || products.length === 0)
      return { subtotal: 0, tax: 0, shipping: 0, total: 0 };

    const subtotal = products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );

    const tax = subtotal * taxRate;
    const shipping = subtotal > 100 ? 0 : shippingCost;
    const total = subtotal + tax + shipping;

    return { subtotal, tax, shipping, total };
  };

  // Handle order placement
  const handleCheckout = () => {
    alert(
      "Thank you for your order! In a real shop, we would process payment here."
    );
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Loading your cart...</p>
      </div>
    );

  const hasProducts = products && products.length > 0;
  const { subtotal, tax, shipping, total } = calculatePrice(products);

  return (
    <section className="px-4 py-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8 pb-4 border-b">
        My Cart
      </h2>

      {!hasProducts && (
        <div className="text-center py-16">
          <p className="text-xl mb-4">Your shopping cart is empty</p>
          <p className="text-gray-500">Find something great in our shop!</p>
        </div>
      )}

      {hasProducts && (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <ul>
              {products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
            </ul>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80 space-y-4">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>

            {/* Location Selector */}
            <div className="flex items-center gap-2 mb-4">
              <BsGeoAlt className="text-gray-500" />
              <select
                className="p-2 border rounded w-full"
                value={location.province}
                onChange={handleLocationChange}
              >
                <option value="BC">British Columbia</option>
                <option value="AB">Alberta</option>
                <option value="ON">Ontario</option>
                <option value="WA">Washington (US)</option>
              </select>
            </div>

            {/* Price Breakdown */}
            <div className="bg-gray-50 p-4 rounded-md space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax ({(taxRate * 100).toFixed()}%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {shipping === 0
                    ? "Free shipping on orders over $100"
                    : "Free shipping for orders over $100"}
                </div>
              </div>
            </div>
            <Button
              className="w-full"
              text="Place Order"
              onClick={handleCheckout}
            />
            <div className="text-xs text-gray-500 mt-2">
              <p>
                * This is a practice project. No real payments are processed.
              </p>
              <p>* Taxes calculated based on selected province/state.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default MyCart;
