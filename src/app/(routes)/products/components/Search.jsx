import { HiMagnifyingGlass } from "react-icons/hi2";

export default function Search() {
  return (
    <form
      role="search"
      action="/"
      method="get"
      className="mx-auto flex w-full max-w-xl items-center gap-3 px-4 py-4"
    >
      <button
        type="submit"
        aria-label="Søg"
        className="flex size-12 shrink-0 items-center justify-center rounded-full bg-coral text-white hover:bg-coral/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
      >
        <HiMagnifyingGlass
          aria-hidden="true"
          size={20}
          className="scale-x-[-1]"
          strokeWidth={2.5}
        />
      </button>

      <div className="min-w-0 flex-1 rounded-full bg-white shadow-md ring-1 ring-black/10 focus-within:ring-2 focus-within:ring-coral">
        <label htmlFor="brand-search" className="sr-only">
          Søg efter Produkter
        </label>
        <input
          id="brand-search"
          name="query"
          type="search"
          placeholder="Søg efter Produkter"
          className="w-full bg-transparent px-5 py-3 text-gray-800 outline-none placeholder:text-gray-400"
        />
      </div>
    </form>
  );
}
