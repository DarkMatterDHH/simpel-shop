
"use client";

import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { useCartStore } from "./Cart";

const AddToCart = ({ id, title, price, thumbnail, stock }) => {
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const product = {
    id,
    title,
    price,
    thumbnail,
    stock,
  };

  // Find produktet i kurven
  const cartProduct = cart.find((item) => item.id === id);

  // Antal produkter i kurven
  const quantity = cartProduct?.quantity || 0;

  // Tilføj ét produkt
  const increase = () => {
    if (quantity < stock) {
      addToCart(product);
    }
  };

  // Fjern ét produkt
  const decrease = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    } else if (quantity === 1) {
      removeFromCart(id);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <button
        type="button"
        onClick={decrease}
        disabled={quantity === 0}
        aria-label={`Fjern én ${title} fra kurven`}
        className="text-3xl disabled:opacity-30"
      >
        <FiMinusCircle />
      </button>

      <span className="text-lg font-semibold">
        {quantity}
      </span>

      <button
        type="button"
        onClick={increase}
        disabled={quantity >= stock}
        aria-label={`Tilføj én ${title} til kurven`}
        className="text-3xl disabled:opacity-30"
      >
        <FiPlusCircle />
      </button>
    </div>
  );
};

export default AddToCart;
