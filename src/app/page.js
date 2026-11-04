import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";

export default async function Home() {
  const response = await fetch(
    "https://dummyjson.com/products/category/furniture?limit=1",
  );

  const data = await response.json();
  const heroImage = data.products[0]?.images[0];
  const categories = ["beauty", "furniture", "groceries", "smartphones"];

  // Hent et produktbillede fra hver kategori
  const categoryData = await Promise.all(
    categories.map(async (category) => {
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}?limit=1`,
      );

      if (!response.ok) {
        throw new Error("Kunne ikke hente kategorier");
      }

      const data = await response.json();

      return {
        name: category,
        image: data.products[0]?.thumbnail,
      };
    }),
  );

  return (
    <>
      <Header />

      <main className="mx-auto w-full max-w-[1600px] px-4 py-6 md:px-8 lg:px-12">
        {/* HERO SEKTION */}
        <section className="relative flex min-h-[420px] w-full items-center overflow-hidden rounded-2xl bg-[#C4B5FD] md:min-h-[500px]">
          {/* Baggrundsbillede */}
          {heroImage && (
            <Image
              src={heroImage}
              alt="Udvalgt produkt"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1600px"
              className="object-cover"
            />
          )}

          {/* Overlay for læsbarhed */}
          <div className="absolute inset-0 bg-[#6D28D9]/40" />

          {/* Tekst og knap */}
          <div className="relative z-10 max-w-xl px-8 py-12 text-white md:px-16">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Find dine favoritter
            </h1>

            <p className="mb-6 text-lg">Opdag vores udvalg af produkter</p>

            <Link
              href="/products"
              className="inline-block rounded-xl bg-white px-8 py-3 font-semibold text-[#6D28D9] transition hover:bg-[#F8F7FF]"
            >
              Shop nu
            </Link>
          </div>
        </section>

        {/* KATEGORIER */}
        <section className="mt-8 md:mt-10">
          <h2 className="mb-5 text-3xl font-bold text-[#6D28D9]">Kategorier</h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {categoryData.map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${category.name}`}
                className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-lg"
              >
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={250}
                    height={180}
                    className="mb-4 h-36 w-full object-contain"
                  />
                )}

                <h3 className="text-lg font-semibold capitalize text-black">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
