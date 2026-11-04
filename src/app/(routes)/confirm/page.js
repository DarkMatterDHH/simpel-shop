import Header from "../../components/Header";
import Confirm from "./component/Confirm";

export default function BuyPage() {
  return (
    <>
      <Header />

      <main className="w-full px-6 py-12">
        <Confirm />
      </main>
    </>
  );
}
