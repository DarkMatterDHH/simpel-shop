import Link from "next/link";

export default async function Filter({ selectedCategory = "", query = "" }) {
  let categories = [];

  try {
    const response = await fetch("https://dummyjson.com/products/categories");
    if (response.ok) {
      categories = await response.json();
    }
  } catch (error) {
    console.error("Could not load product categories.", error);
  }

  const categoryHref = (slug) => {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (slug) params.set("category", slug);
    const search = params.toString();
    return search ? `/products?${search}` : "/products";
  };

  return (
    <nav
      aria-label="Filter by category"
      className="rounded-xl bg-white p-4 shadow-sm"
    >
      <h2 className="text-lg font-semibold">Categories</h2>
      <ul className="mt-3 flex flex-wrap gap-2 md:flex-col">
        <li>
          <Link
            href={categoryHref("")}
            aria-current={!selectedCategory ? "page" : undefined}
            className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
              !selectedCategory
                ? "bg-button text-white"
                : "text-tekst hover:bg-foreground/50"
            }`}
          >
            All categories
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={categoryHref(category.slug)}
              aria-current={
                selectedCategory === category.slug ? "page" : undefined
              }
              className={`block rounded-lg px-3 py-2 text-sm capitalize transition-colors ${
                selectedCategory === category.slug
                  ? "bg-button text-white"
                  : "text-tekst hover:bg-foreground/50"
              }`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
      {categories.length === 0 && (
        <p className="mt-3 text-sm text-tekst/70">
          Categories are unavailable right now.
        </p>
      )}
    </nav>
  );
}
