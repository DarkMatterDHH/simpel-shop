import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";

function Header() {
  return (
    <header className="flex h-11 items-center justify-between bg-[#a3a3a3] px-5 text-tekst">
      <nav className="flex items-center gap-14 text-[28px] leading-none">
        <Link href="/">Home</Link> <Link href="/products">Products</Link>
      </nav>
      <FaCartShopping aria-label="Shopping cart" className="text-[26px]" />
    </header>
  );
}

export default Header;
