import Header from "../../components/Header";
import ProdCard from "./components/ProdCard";

export default function Home() {
  return (
    <>
      <Header></Header>
      <div className="grid grid-cols-3 gap-4">
        <aside>{/* Add left-column content here */}</aside>
        <ProdCard className="col-span-2"></ProdCard>
      </div>
    </>
  );
}
