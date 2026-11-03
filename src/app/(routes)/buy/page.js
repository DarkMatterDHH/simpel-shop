import Header from "../../components/Header";
import CartOverview from "./component/CartOverview";

export default function BuyPage() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl p-8">
        <h1 className="mb-8 text-3xl font-bold">
          Din kurv
        </h1>

        <CartOverview />
      </main>
    </>
  );
}