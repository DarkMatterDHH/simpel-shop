import Link from "next/link";
import Header from "./components/Header";

export default function Home() {
  const categories = ["Beauty", "Furniture", "Groceries", "Smartphones"];

  return (
    <>
      <Header />

      <main className="mx-auto w-full max-w-[1600px] px-4 py-6 md:px-8 lg:px-12">
        {/* HERO SEKTION */}
        <section className="flex min-h-[420px] w-full flex-col items-center justify-center rounded-2xl bg-[#C4B5FD] p-6 text-center md:min-h-[500px]">
          <p className="mb-4 text-sm text-gray-700">
            [ Hero Background Image ]
          </p>

          <h1 className="mb-4 text-4xl font-bold text-black md:text-5xl">
            Find dine favoritter
          </h1>

          <p className="mb-6 text-lg text-gray-800">
            Opdag vores udvalg af produkter
          </p>

          <Link
            href="/products"
            className="rounded-xl bg-[#6D28D9] px-8 py-3 font-semibold text-white transition hover:bg-purple-800"
          >
            Shop nu
          </Link>
        </section>

        {/* KATEGORIER */}
        <section className="mt-8 md:mt-10">
          <h2 className="mb-5 text-3xl font-bold text-[#6D28D9]">Kategorier</h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {categories.map((category) => (
              <div
                key={category}
                className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl bg-white p-5 shadow-sm"
              >
                <div className="mb-4 flex h-36 w-full items-center justify-center rounded-xl bg-gray-200 text-center text-sm text-gray-600">
                  Billede placeholder
                </div>

                <h3 className="text-lg font-semibold text-black">{category}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
