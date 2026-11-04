"use client";

import Link from "next/link";
import { FiHome } from "react-icons/fi";
import { GiConfirmed } from "react-icons/gi";
import { useEffect, useState } from "react";
import { useCartStore } from "../../buy/component/Cart";

export default function Confirm() {
  const [confirmed, setConfirmed] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [order, setOrder] = useState(null);

  // Hent produkter fra Zustand
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (!hasHydrated) {
    return <p>Indlæser ordre...</p>;
  }

  // Beregn totalpris
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Gem ordreoplysninger før kurven tømmes
  const confirmPurchase = () => {
    if (cart.length === 0) return;

    setOrder({
      items: [...cart],
      total,
      quantity,
    });

    setConfirmed(true);
    clearCart();
  };

  // Vis enten nuværende kurv eller bekræftet ordre
  const displayedItems = confirmed ? (order?.items ?? []) : cart;
  const displayedTotal = confirmed ? (order?.total ?? 0) : total;
  const displayedQuantity = confirmed ? (order?.quantity ?? 0) : quantity;

  return (
    <div className="flex min-h-screen flex-col items-center gap-5 bg-[#f8f7ff] px-5 py-10">
      {/* Besked */}
      <div className="flex w-full max-w-[480px] flex-col items-center rounded-xl bg-white px-5 py-10 text-center">
        {confirmed ? (
          <>
            <GiConfirmed size={40} className="mb-4 text-[#6d28d9]" />

            <h2 className="text-2xl font-bold text-[#6d28d9]">
              Tak for dit køb!
            </h2>
          </>
        ) : (
          <h2 className="text-2xl font-bold text-[#6d28d9]">Bekræft dit køb</h2>
        )}
      </div>

      {/* Ordredetaljer fra Zustand */}
      <div className="flex w-full max-w-[480px] flex-col rounded-xl bg-white p-6">
        <h3 className="mb-6 text-center text-xl font-semibold text-[#6d28d9]">
          Ordredetaljer
        </h3>

        {displayedItems.length === 0 ? (
          <p className="text-center text-gray-600">Din kurv er tom.</p>
        ) : (
          <>
            {/* Produkter */}
            <div className="space-y-4">
              {displayedItems.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 border-b border-gray-200 pb-4"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-20 w-20 object-contain"
                  />

                  <div className="flex-1">
                    <h4 className="font-semibold text-[#111111]">
                      {product.title}
                    </h4>

                    <p className="text-sm text-gray-600">
                      Antal: {product.quantity}
                    </p>

                    <p className="text-sm text-gray-600">
                      ${(product.price * product.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Samlet ordre */}
            <div className="mt-6 space-y-3 text-[#111111]">
              <div className="flex justify-between">
                <span>Antal varer</span>
                <span>{displayedQuantity}</span>
              </div>

              <div className="flex justify-between">
                <span>Levering</span>
                <span>Gratis</span>
              </div>

              <hr className="border-gray-200" />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${displayedTotal.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}

        {/* Bekræft køb */}
        {!confirmed && (
          <button
            type="button"
            onClick={confirmPurchase}
            disabled={cart.length === 0}
            className="mt-8 cursor-pointer rounded-lg bg-[#6d28d9] px-5 py-3 text-white transition-colors duration-300 hover:bg-[#ec4899] disabled:cursor-not-allowed disabled:bg-[#c4b5fd]"
          >
            Bekræft køb
          </button>
        )}

        {confirmed && (
          <p className="mt-6 text-center font-semibold text-[#6d28d9]">
            Køb bekræftet!
          </p>
        )}
      </div>

      {/* Home-knap */}
      <Link
        href="/"
        className="flex items-center justify-center gap-2.5 rounded-lg bg-[#c4b5fd] px-[60px] py-[15px] text-[#6d28d9] no-underline transition-colors duration-300 hover:bg-[#ec4899] hover:text-white"
      >
        <FiHome size={22} />
        <span>Home</span>
      </Link>
    </div>
  );
}
