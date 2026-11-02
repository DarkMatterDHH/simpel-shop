import Image from "next/image";

export default function Home() {
  return <FetchData />;
}

const FetchData = async () => {
  const response = await fetch("https://dummyjson.com/products", {
    method: "GET",
    // headers er der vi sender API-nøglen med i forespørgslen
    headers: {
      "x-api-key": process.env.API_KEY,
    },
  });
  const products = await response.json();

  return (
    <div className="grid grid-cols-3 gap-4">
      <aside>{/* Add left-column content here */}</aside>

      <div className="col-span-2 grid grid-cols-2 gap-4 ">
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
      </div>
    </div>
  );
};
