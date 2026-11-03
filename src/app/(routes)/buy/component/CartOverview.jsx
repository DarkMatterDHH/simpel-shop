"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "./Cart";

export default function CartOverview() {
  const [hasHydrated, setHasHydrated] = useState(false);

  // Hent data fra Zustand
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );
  const updateQuantity = useCartStore(
    (state) => state.updateQuantity
  );

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (!hasHydrated) {
    return <p>Indlæser kurv...</p>;
  }

  // Beregn samlet pris
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="grid gap-8 md:grid-cols-3">

      {/* VENSTRE SIDE - PRODUKTER */}
      <section className="md:col-span-2">
        <h2>Produkter i kurven</h2>

        {cart.length === 0 ? (
          <p>Din kurv er tom.</p>
        ) : (
          cart.map((product) => (
            <div key={product.id} className="border-b p-4">

              {/* Produktinformation */}
              <img
                src={product.thumbnail}
                alt={product.title}
                width={100}
              />

              <h3>{product.title}</h3>

              <p>Pris: ${product.price}</p>

              {/* Antal */}
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
                className="w-16 border p-1"
              />

              {/* Fjern produkt */}
              <button
                type="button"
                onClick={() => removeFromCart(product.id)}
              >
                Fjern
              </button>

            </div>
          ))
        )}
      </section>

      {/* HØJRE SIDE - ORDREOVERSIGT */}
      <aside className="border p-4">
        <h2>Ordreoversigt</h2>

        <p>Antal forskellige produkter: {cart.length}</p>

        <p>Levering: Gratis</p>

        <h3>Total: ${total.toFixed(2)}</h3>

        {/* Her kan du senere tilføje:
            - Rabatkode
            - Leveringsmetode
            - Betalingsknap
            - Flere ordreoplysninger
        */}

      </aside>
    </div>
  );
}
