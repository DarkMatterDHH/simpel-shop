"use client";

import Link from "next/link";
import { FiHome } from "react-icons/fi";
import { GiConfirmed } from "react-icons/gi";
import { useState } from "react";

export default function Confirm() {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center gap-5 bg-[#f8f7ff] px-5 py-10">
      {/* Besked */}
      <div className="flex w-full max-w-[380px] flex-col items-center rounded-xl bg-white px-5 py-10 text-center">
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

      {/* Ordredetaljer */}
      <div className="flex min-h-[180px] w-full max-w-[240px] flex-col items-center rounded-xl bg-white p-5 text-center">
        <h3 className="text-xl font-semibold text-[#6d28d9]">Detaljer</h3>

        <p className="mt-5 text-[#333333]">Her kommer dine ordreoplysninger</p>

        <button
          onClick={() => setConfirmed(true)}
          disabled={confirmed}
          className="mt-8 cursor-pointer rounded-lg bg-[#6d28d9] px-5 py-3 text-white transition-colors duration-300 hover:bg-[#ec4899] disabled:cursor-default disabled:bg-[#c4b5fd]"
        >
          {confirmed ? "Køb bekræftet" : "Bekræft køb"}
        </button>
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
