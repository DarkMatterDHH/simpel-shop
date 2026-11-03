import Header from "../../components/Header";
import ProdCard from "./components/ProdCard";
import Search from "./components/Search";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const query = typeof params?.query === "string" ? params.query : "";

  return (
    <>
      <Header></Header>

      <main className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-8 md:grid-cols-[minmax(220px,1fr)_3fr]">
        <aside className="hidden md:block" aria-label="Product filters">
          {/* Add left-column content here */}
        </aside>
        <section className="min-w-0 md:col-start-2" aria-label="Products">
          <Search query={query} />
          <ProdCard query={query} />
        </section>
      </main>
    </>
  );
}
