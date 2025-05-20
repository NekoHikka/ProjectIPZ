import { createRoot } from "react-dom/client";
import "../src/assets/styles/index.css";
import App from "./App.jsx";
import { CartProvider } from "./utils/CartContext.jsx";
createRoot(document.getElementById("root")).render(
  <CartProvider>
    <App />
  </CartProvider>
);
