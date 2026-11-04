import Image from "next/image";
import Link from "next/link";
import Description from "./components/Description";
import Header from "../../components/Header";
import Price from "./components/Price";
import Tags from "./components/Tags";
import Brand from "./components/Brand";
import Stock from "./components/Stock";
import Reviews from "./components/Reviews";
import Rating from "./components/Rating";

export default async function DetailView({ searchParams }) {
  const { id } = await searchParams;
  let description = "";
  let brandName = "Product";
  let price = "";
  let image = "";
  let rating = "";
  let discountPercentage = "";
  let tags = [];
  let brand = "";
  let stock = "";
  let reviews = [];

  if (typeof id === "string" && /^\d+$/.test(id)) {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${encodeURIComponent(id)}`,
        {
          cache: "no-store",
        },
      );

      if (response.ok) {
        const product = await response.json();
        brandName = product.title || brandName;
        image = product.image?.url || image;
        description = product.description || "";
        price = product.price || "";
        rating = product.rating || "";
        discountPercentage = product.discountPercentage || "";
        tags = product.tags || [];
        brand = product.brand || "";
        stock = product.stock || "";
        reviews = product.reviews || [];
      }
    } catch {
      // The description component displays a fallback if the API is unavailable.
    }
  }

  return (
    <main className="mx-auto w-full max-w-2xl p-6 pb-28">
      <Header> </Header>
      <h1 className="mb-6 text-2xl font-bold">Product details</h1>
      <Brand brand={brand} />
      <div className="relative mb-6 overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt={`Photo of ${brandName}`}
          width={800}
          height={572}
          className="aspect-[1.4] w-full object-cover"
          priority
        />
        <Link
          href="/"
          aria-label="Back to product list"
          className="absolute left-3 top-3 z-10 rounded-full bg-white/90 p-2 text-neutral-800 shadow-sm transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2"
        ></Link>
      </div>
      <h2 className="mb-3 text-xl font-semibold">{brandName}</h2>
      <Tags tags={tags} />
      <Description description={description} />
      <Price price={price} discountPercentage={discountPercentage} />
      <Stock stock={stock} />
      <Reviews reviews={reviews} rating={rating} />
      <Rating rating={rating} />
    </main>
  );
}
