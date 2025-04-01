import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import NotFound from "./pages/NotFound.jsx";
import NewProduct from "./pages/NewProduct.jsx";
import MyCart from "./pages/MyCart.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import AllProducts from "./pages/AllProducts.jsx";
import Home from "./pages/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "/products", element: <AllProducts /> },
      { path: "/products/new", element: <NewProduct /> },
      { path: "/products/:id", element: <ProductDetail /> },
      { path: "/cart", element: <MyCart /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
