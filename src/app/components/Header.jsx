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
    <header className="flex h-11 items-center justify-between bg-background px-5 text-tekst">
      <nav className="flex items-center gap-14 text-[28px] leading-none">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
      </nav>

      <Link href="/buy" className="relative" aria-label={`Kurv med ${cartCount} varer`}>
        <FaCartShopping className="text-[26px]" />

        {hasHydrated && cartCount > 0 && (
          <span className="absolute -right-3 -top-2 rounded-full bg-red-600 px-1.5 text-xs text-white">
            {cartCount}
          </span>
        )}
      </Link>
    </header>
  );
}