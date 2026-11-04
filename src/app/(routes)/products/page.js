import Header from "../../components/Header";
import Filter from "./components/Filter";
import ProdCard from "./components/ProdCard";
import Search from "./components/Search";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const query = typeof params?.query === "string" ? params.query : "";
  const category = typeof params?.category === "string" ? params.category : "";

  return (
    <>
      <Header></Header>

      <main className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-8 md:grid-cols-[minmax(220px,1fr)_3fr]">
        <aside className="md:col-start-1" aria-label="Product filters">
          <Filter selectedCategory={category} query={query} />
        </aside>
        <section className="min-w-0 md:col-start-2" aria-label="Products">
          <Search query={query} category={category} />
          <ProdCard query={query} category={category} />
        </section>
      </main>
    </>
  );
}
