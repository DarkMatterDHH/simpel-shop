"use client";

import { useCartStore } from "../store/cartStore";

const AddToCart = ({ id, title, price, thumbnail, stock }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const product = {
    id,
    title,
    price,
    thumbnail,
    stock,
  };

  return (
    <button
      type="button"
      disabled={stock <= 0}
      aria-label={`Tilføj ${title} til kurv`}
      onClick={() => addToCart(product)}
      className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {stock <= 0 ? "Udsolgt" : "Tilføj til kurv"}
    </button>
  );
};

export default AddToCart;
