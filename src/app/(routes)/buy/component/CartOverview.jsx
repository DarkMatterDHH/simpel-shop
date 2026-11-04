"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "./Cart";
import { FaRegCreditCard } from "react-icons/fa6";

export default function CartOverview() {
  const [hasHydrated, setHasHydrated] = useState(false);

  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (!hasHydrated) {
    return <p>Indlæser kurv...</p>;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-[2fr_1fr]">
      {/* VENSTRE - INDHOLD AF KURV */}
      <section className="min-h-80 rounded-xl bg-white p-6 text-[#111111] shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">Indhold af kurv</h2>

        {cart.length === 0 ? (
          <p>Din kurv er tom.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((product) => (
              <article
                key={product.id}
                className="flex flex-wrap items-center gap-4 rounded-lg bg-white p-4"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-24 w-24 object-contain"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">{product.title}</h3>

                  <p className="mt-1">${product.price}</p>

                  <div className="mt-3 flex items-center gap-4">
                    <input
                      type="number"
                      min="1"
                      value={product.quantity}
                      onChange={(e) => {
                        const quantity = Number(e.target.value);

                        if (Number.isInteger(quantity) && quantity >= 1) {
                          updateQuantity(product.id, quantity);
                        }
                      }}
                      aria-label={`Antal af ${product.title}`}
                      className="w-16 rounded border border-gray-300 p-1"
                    />

                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Fjern
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* HØJRE - BETALINGSDETALJER */}
      <aside className="min-h-80 rounded-xl bg-white p-6 text-[#111111] shadow-sm">
        <h2 className="mb-6 font-family-name:var(--font-poppins) text-2xl font-bold">
          Betalingsdetaljer
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Antal varer</span>
            <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </div>

          <div className="flex justify-between">
            <span>Levering</span>
            <span>Gratis</span>
          </div>

          <hr className="border-gray-400" />

          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
            <div className="mt-4 flex items-center gap-3">
              <FaRegCreditCard
                size={32}
                className="text-[#6D28D9]"
                aria-hidden="true"
              />
            </div>
            <Link
              href="/confirm"
              className="mt-6 block rounded-xl bg-[#6D28D9] px-6 py-3 text-center font-semibold text-white transition hover:bg-[#5B21B6]"
            >
              Bekræft køb
            </Link>
          </div>

          {/* Betalingsknap tilføjes senere */}
        </div>
      </aside>
    </div>
  );
}
