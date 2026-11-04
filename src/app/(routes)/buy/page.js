import Header from "../../components/Header";
import CartOverview from "./component/CartOverview";

export default function BuyPage() {
  return (
    <>
      <Header />

      <main className="w-full px-6 py-12">
        <CartOverview />
      </main>
    </>
  );
}