
import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";

export default async function Home({ searchParams }) {
  const params = await searchParams;

  const categories = [
    "beauty",
    "furniture",
    "groceries",
    "smartphones",
  ];

  const selectedCategory = categories.includes(params?.category)
    ? params.category
    : null;

  // Hent hero-billede
  const heroResponse = await fetch(
    "https://dummyjson.com/products/category/furniture?limit=1"
  );

  const heroData = await heroResponse.json();
  const heroImage = heroData.products?.[0]?.images?.[0];

  // Hent billeder til kategorikortene
  const categoryData = await Promise.all(
    categories.map(async (category) => {
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}?limit=1`
      );

      const data = await response.json();

      return {
        name: category,
        image: data.products?.[0]?.thumbnail,
      };
    })
  );

  // Hent produkter fra valgt kategori
  let selectedProducts = [];

  if (selectedCategory) {
    const response = await fetch(
      `https://dummyjson.com/products/category/${selectedCategory}?limit=6`
    );

    if (response.ok) {
      const data = await response.json();
      selectedProducts = data.products ?? [];
    }
  }

  return (
    <>
      <Header />

      <main className="mx-auto w-full max-w-[1600px] px-4 py-6 md:px-8 lg:px-12">

        {/* HERO */}
        <section className="relative flex min-h-[420px] w-full items-center overflow-hidden rounded-2xl bg-[#C4B5FD] md:min-h-[500px]">

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

          <div className="absolute inset-0 bg-[#6D28D9]/40" />

          <div className="relative z-10 max-w-xl px-8 py-12 text-white md:px-16">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Find dine favoritter
            </h1>

            <p className="mb-6 text-lg">
              Opdag vores udvalg af produkter
            </p>

            <Link
              href="/products"
              className="inline-block rounded-xl bg-white px-8 py-3 font-semibold text-[#6D28D9] hover:bg-[#F8F7FF]"
            >
              Shop nu
            </Link>
          </div>
        </section>

        {/* KATEGORIER */}
        <section className="mt-8 md:mt-10">
          <h2 className="mb-5 text-3xl font-bold text-[#6D28D9]">
            Kategorier
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {categoryData.map((category) => (
              <Link
                key={category.name}
                href={`/?category=${category.name}#kategori-produkter`}
                className={`flex min-h-[220px] flex-col items-center justify-center rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-lg ${
                  selectedCategory === category.name
                    ? "ring-2 ring-[#6D28D9]"
                    : ""
                }`}
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

        {/* PRODUKTER FRA VALGT KATEGORI */}
        {selectedCategory && (
          <section
            id="kategori-produkter"
            className="mt-10 scroll-mt-8"
          >
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-3xl font-bold capitalize text-[#6D28D9]">
                {selectedCategory}
              </h2>

              <Link
                href="/"
                className="font-semibold text-[#6D28D9] hover:text-[#EC4899]"
              >
                Ryd filter
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {selectedProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/detailview?id=${product.id}`}
                  className="flex flex-col rounded-xl bg-white p-4 shadow-sm transition hover:shadow-lg"
                >
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={250}
                    height={250}
                    className="aspect-square w-full object-contain"
                  />

                  <h3 className="mt-3 font-semibold text-black">
                    {product.title}
                  </h3>

                  <p className="mt-auto pt-2 font-bold text-[#6D28D9]">
                    ${product.price.toFixed(2)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
