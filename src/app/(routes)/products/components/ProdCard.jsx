import Image from "next/image";
import Link from "next/link";

export default function ProdCard({ className = "" }) {
  return <FetchData className={className} />;
}

const FetchData = async ({ className }) => {
  const response = await fetch("https://dummyjson.com/products", {
    method: "GET",
    // headers er der vi sender API-nøglen med i forespørgslen
    headers: {
      "x-api-key": process.env.API_KEY,
    },
  });
  const products = await response.json();

  return (
    <Link className={`grid grid-cols-2 gap-4 ${className}`}>
      {products.products.map((product) => (
        <article
          key={product.id}
          className="text-tekst border-2 border-tekst rounded-xl p-4 flex flex-col items-center gap-4"
        >
          <Image
            className="rounded-xl bg-foreground"
            src={product.images[0]}
            alt={product.title}
            width={500}
            height={500}
            loading="eager"
          />
          <div>{product.brand}</div>
        </article>
      ))}
    </Link>
  );
};
