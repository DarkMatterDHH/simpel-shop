import Image from "next/image";
import Link from "next/link";

export default function ProdCard({ query = "" }) {
  return <FetchData query={query} />;
}

const FetchData = async ({ query }) => {
  const endpoint = query
    ? `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`
    : "https://dummyjson.com/products";
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error("Kunne ikke hente produkter.");
  }

  const products = await response.json();
  const items = products.products ?? [];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.length > 0 ? (
        items.map((product) => (
          <Link
            key={product.id}
            href={`/detailview?id=${product.id}`}
            className="flex flex-col items-center gap-4 rounded-xl border-2 border-tekst p-4 text-tekst transition-shadow hover:shadow-lg"
          >
            <Image
              className="aspect-square w-full rounded-xl bg-foreground object-cover"
              src={product.images[0]}
              alt={product.title}
              width={500}
              height={500}
              loading="lazy"
            />
            <div className="text-center">
              <h2 className="font-semibold">{product.title}</h2>
              <p className="text-sm text-tekst/70">{product.brand}</p>
            </div>
          </Link>
        ))
      ) : (
        <p className="col-span-full py-8 text-center text-tekst/70">
          Ingen produkter matcher “{query}”.
        </p>
      )}
    </div>
  );
};
