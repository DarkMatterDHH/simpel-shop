"use client";

import Link from "next/link";
import { FiHome } from "react-icons/fi";
import { useState } from "react";

export default function Confirm() {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="confirm">
      <div className="message">
        <h2>{confirmed ? "Tak for dit køb!" : "Bekræft dit køb"}</h2>
      </div>

      <div className="details">
        <h3>Detaljer</h3>
        <p>Her kommer dine ordreoplysninger</p>

        <button onClick={() => setConfirmed(true)}>
          {confirmed ? "Køb bekræftet" : "Bekræft køb"}
        </button>
      </div>

      <Link href="/" className="home-btn">
        <FiHome size={22} />
        <span>Home</span>
      </Link>
    </div>
  );
}
