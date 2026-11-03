import Header from "../../components/Header";
import ProdCard from "./components/ProdCard";
import Search from "./components/Search";

export default function Home({ searchParams }) {
  return (
    <>
      <Header></Header>

      <div className="grid grid-cols-3 gap-4">
        <aside className="col-span-1">
          {/* Add left-column content here */}
        </aside>
        <Search className="col-span-2" searchParams={searchParams} />
        <ProdCard className="col-span-2"></ProdCard>
      </div>
    </>
  );
}
