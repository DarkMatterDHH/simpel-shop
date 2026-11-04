
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useCartStore } from "../(routes)/buy/component/Cart";

export default function Header() {
  const [hasHydrated, setHasHydrated] = useState(false);
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const cartCount = hasHydrated
    ? cart.reduce((total, item) => total + item.quantity, 0)
    : 0;

  return (
    <header className="w-full border-b border-[#C4B5FD] bg-white shadow-sm">
      <div className="mx-auto flex h-20 w-full max-w-[1600px] items-center justify-between px-4 md:px-8 lg:px-12">

        {/* Navigation */}
        <nav className="flex items-center gap-6 md:gap-12">
          <Link
            href="/"
            className="text-lg font-semibold text-[#6D28D9] transition-colors hover:text-[#EC4899] md:text-xl"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="text-lg font-semibold text-[#6D28D9] transition-colors hover:text-[#EC4899] md:text-xl"
          >
            Products
          </Link>
        </nav>

        {/* Kurv */}
        <Link
          href="/buy"
          className="relative rounded-lg p-2 text-[#6D28D9] transition-colors hover:bg-[#F8F7FF] hover:text-[#EC4899]"
          aria-label={`Kurv med ${cartCount} varer`}
        >
          <FaCartShopping size={28} aria-hidden="true" />

          {hasHydrated && cartCount > 0 && (
            <span className="absolute -right-2 -top-2 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#EC4899] px-1 text-xs font-bold text-white">
              {cartCount}
            </span>
          )}
        </Link>

      </div>
    </header>
  );
}
