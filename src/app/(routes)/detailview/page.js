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
import { MdArrowBackIosNew } from "react-icons/md";
import AddToCart from "../buy/component/AddToCart";

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
        image =
          product.thumbnail ||
          product.images?.[0] ||
          product.image?.url ||
          image;
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
    <main className="mx-auto w-full max-w-7xl px-4 py-6 text-tekst sm:px-6 lg:px-8">
      <Header />
      <Link
        href="/products"
        className="mb-6 inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-tekst transition-colors hover:bg-hover"
      >
        <MdArrowBackIosNew aria-hidden="true" size={14} />
        Navigering
      </Link>

      <div className="grid items-start gap-5 md:grid-cols-[minmax(0,2fr)_minmax(18rem,0.92fr)]">
        <section
          aria-label="Product image"
          className="relative flex min-h-80 items-center justify-center overflow-hidden rounded-xl border border-foreground bg-background p-6 md:min-h-[38rem]"
        >
          {image ? (
            <Image
              src={image}
              alt={`Photo of ${brandName}`}
              width={1000}
              height={800}
              className="max-h-[34rem] w-full object-contain"
              priority
            />
          ) : (
            <p className="text-tekst/70">Product image unavailable</p>
          )}
        </section>

        <aside className="flex min-h-80 flex-col rounded-xl bg-foreground p-5 text-tekst sm:p-6 md:min-h-[38rem]">
          <section aria-labelledby="product-information">
            <h1 id="product-information" className="mb-4 text-2xl font-bold">
              Information
            </h1>
            <Brand brand={brand} />
            <h2 className="mt-1 text-xl font-semibold">{brandName}</h2>
            <div className="mt-3">
              <Tags tags={tags} />
            </div>
            <div className="mt-4">
              <Description description={description} />
            </div>
            <div className="mt-4 space-y-1">
              <Price price={price} discountPercentage={discountPercentage} />
              <Stock stock={stock} />
            </div>
          </section>

          <section
            aria-labelledby="product-reviews"
            className="mt-6 border-t border-tekst/20 pt-5"
          >
            <h2 id="product-reviews" className="mb-2 text-lg font-semibold">
              Reviews
            </h2>
            <Rating rating={rating} />
            <div className="mt-3 max-h-40 space-y-3 overflow-y-auto">
              {reviews.length > 0 ? (
                <Reviews reviews={reviews} />
              ) : (
                <p className="text-sm text-tekst/70">No reviews yet.</p>
              )}
            </div>
          </section>

          <section
            className="mt-auto border-t border-tekst/20 pt-5"
            aria-label="Add to cart"
          >
            <p className="mb-3 font-semibold">Add to cart</p>
            <AddToCart
              id={id}
              title={brandName}
              price={price}
              thumbnail={image}
              stock={stock}
            />
          </section>
        </aside>
      </div>
    </main>
  );
}
