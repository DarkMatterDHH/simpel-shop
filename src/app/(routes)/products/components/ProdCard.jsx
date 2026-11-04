import Image from "next/image";
import Link from "next/link";
import AddToCart from "../../buy/component/AddToCart";

export default function ProdCard({ query = "", category = "" }) {
  return <FetchData query={query} category={category} />;
}

const FetchData = async ({ query, category }) => {
  const endpoint = category
    ? `https://dummyjson.com/products/category/${encodeURIComponent(category)}`
    : query
      ? `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`
      : "https://dummyjson.com/products";

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error("Kunne ikke hente produkter.");
  }

  const products = await response.json();
  const items = (products.products ?? []).filter((product) => {
    if (!category || !query) return true;
    const searchableText = `${product.title} ${product.description} ${product.brand ?? ""}`;
    return searchableText.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.length > 0 ? (
        items.map((product) => (
          <article
            key={product.id}
            className="flex flex-col gap-4 rounded-xl border-2 border-tekst p-4 text-tekst transition-shadow hover:shadow-lg"
          >
            {/* Klik på produktet åbner detaljesiden */}
            <Link
              href={`/detailview?id=${product.id}`}
              className="flex flex-1 flex-col items-center gap-4"
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

            {/* + og - knapper uden for Link */}
            <AddToCart
              id={product.id}
              title={product.title}
              price={product.price}
              thumbnail={product.thumbnail}
              stock={product.stock}
            />
          </article>
        ))
      ) : (
        <p className="col-span-full py-8 text-center text-tekst/70">
          {category
            ? `No products match “${query}” in this category.`
            : `Ingen produkter matcher “${query}”.`}
        </p>
      )}
    </div>
  );
};
