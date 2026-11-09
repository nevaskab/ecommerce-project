import { useProducts } from "../../contexts/APIContext";

const defaultCategories = ["smartphones", "tablets", "mobile-accessories"];

function formatCategory(category: string) {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function Category({
  selectedCategory,
  onSelectCategory,
}: {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}) {
  const { products } = useProducts();
  const categories = products.length
    ? [...new Set(products.map((product) => product.category))]
    : defaultCategories;
  const categoryOptions = [
    { value: null, label: "All products", count: products.length },
    ...categories.map((category) => ({
      value: category,
      label: formatCategory(category),
      count: products.filter((product) => product.category === category).length,
    })),
  ];

  return (
    <section
      aria-labelledby="category-heading"
      className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">
            Find your next device
          </p>
          <h2
            id="category-heading"
            className="mt-2 text-2xl font-bold text-(--primary-font-color) sm:text-3xl"
          >
            Browse by Category
          </h2>
          <p className="mt-2 text-sm text-(--terciary-font-color)">
            Choose a category to filter the products in our store.
          </p>
        </div>

        <div
          role="group"
          aria-label="Filter products by category"
          className="mt-5 flex flex-wrap gap-2"
        >
          {categoryOptions.map(({ value, label, count }) => {
            const isSelected = selectedCategory === value;

            return (
              <button
                key={value ?? "all"}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onSelectCategory(value)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
                }`}
              >
                <span>{label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    isSelected
                      ? "bg-white/15 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
