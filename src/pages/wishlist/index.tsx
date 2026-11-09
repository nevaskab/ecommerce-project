import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Heart,
  PackageOpen,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useProducts } from "../../contexts/APIContext";
import { api } from "../../services/api";
import { getApiErrorMessage } from "../../services/apiError";

const formatPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

type WishlistItem = {
  id: string;
  apiProduct: string;
};

type ProductSummary = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  category: string;
};

type WishlistResponse = { items: WishlistItem[] };

export function Wishlist() {
  const { user } = useAuth();
  const { products } = useProducts();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [additionalProducts, setAdditionalProducts] = useState<ProductSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pendingProducts, setPendingProducts] = useState<Set<string>>(
    () => new Set(),
  );

  useEffect(() => {
    let isCurrent = true;

    if (!user?.id) {
      setItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    api
      .get<WishlistResponse>("/wishlist")
      .then(({ data }) => {
        if (isCurrent) setItems(data.items);
      })
      .catch((requestError: unknown) => {
        if (isCurrent) {
          setError(
            getApiErrorMessage(
              requestError,
              "Could not load your wishlist. Please try again.",
            ),
          );
        }
      })
      .finally(() => {
        if (isCurrent) setLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [user?.id]);

  useEffect(() => {
    const knownIds = new Set([
      ...products.map((product) => product.id),
      ...additionalProducts.map((product) => product.id),
    ]);
    const missingIds = [
      ...new Set(items.map((item) => Number(item.apiProduct))),
    ].filter((productId) => Number.isInteger(productId) && !knownIds.has(productId));

    if (missingIds.length === 0) return;

    let isCurrent = true;
    Promise.all(
      missingIds.map(async (productId) => {
        try {
          const response = await fetch(`https://dummyjson.com/products/${productId}`);
          if (!response.ok) return null;
          return (await response.json()) as ProductSummary;
        } catch {
          return null;
        }
      }),
    ).then((results) => {
      if (!isCurrent) return;
      const fetchedProducts = results.filter(
        (product): product is ProductSummary => product !== null,
      );
      if (fetchedProducts.length === 0) return;
      setAdditionalProducts((current) => [...current, ...fetchedProducts]);
    });

    return () => {
      isCurrent = false;
    };
  }, [items, products, additionalProducts]);

  const getProduct = (productId: string) => {
    const id = Number(productId);
    return (
      products.find((product) => product.id === id) ??
      additionalProducts.find((product) => product.id === id)
    );
  };

  async function retryLoadingWishlist() {
    if (!user?.id) return;

    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<WishlistResponse>("/wishlist");
      setItems(data.items);
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "Could not load your wishlist. Please try again.",
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  function markPending(productId: string, isPending: boolean) {
    setPendingProducts((current) => {
      const next = new Set(current);
      if (isPending) next.add(productId);
      else next.delete(productId);
      return next;
    });
  }

  async function removeItem(item: WishlistItem) {
    if (pendingProducts.has(item.apiProduct)) return;

    markPending(item.apiProduct, true);
    setError(null);
    setNotice(null);

    try {
      await api.delete(`/wishlist/${item.apiProduct}`);
      setItems((current) =>
        current.filter((wishlistItem) => wishlistItem.apiProduct !== item.apiProduct),
      );
      setNotice("Item removed from your wishlist.");
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "Could not remove this item. Please try again.",
        ),
      );
    } finally {
      markPending(item.apiProduct, false);
    }
  }

  async function addToCart(item: WishlistItem) {
    if (pendingProducts.has(item.apiProduct)) return;

    markPending(item.apiProduct, true);
    setError(null);
    setNotice(null);

    try {
      await api.post("/cart", {
        productId: Number(item.apiProduct),
        quantity: 1,
      });
      setNotice("Item added to your cart.");
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "Could not add this item to your cart. Please try again.",
        ),
      );
    } finally {
      markPending(item.apiProduct, false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-2 text-sm text-(--terciary-font-color)"
      >
        <Link to="/" className="transition-colors hover:text-(--primary-font-color)">
          Home
        </Link>
        <ChevronRight aria-hidden="true" size={15} />
        <span className="text-(--primary-font-color)">Wishlist</span>
      </nav>

      <div className="mb-7 flex flex-wrap items-end justify-between gap-3 sm:mb-9">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">
            Saved for later
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-(--primary-font-color) sm:text-4xl">
            Wishlist
          </h1>
        </div>
        {!loading && items.length > 0 && (
          <p className="text-sm text-(--terciary-font-color)">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
        >
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="mb-5 text-sm text-emerald-700">
          {notice}
        </p>
      )}

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm text-(--terciary-font-color) shadow-sm">
          Loading your wishlist...
        </div>
      ) : error && items.length === 0 ? (
        <section className="rounded-3xl border border-slate-200 bg-white px-5 py-12 text-center shadow-sm sm:px-10">
          <h2 className="text-xl font-bold text-(--primary-font-color)">
            Your wishlist could not be loaded
          </h2>
          <button
            type="button"
            onClick={retryLoadingWishlist}
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-(--dark-button-bg) px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Try again
          </button>
        </section>
      ) : items.length === 0 ? (
        <section className="rounded-3xl border border-slate-200 bg-white px-5 py-14 text-center shadow-sm sm:px-10">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <Heart size={28} aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-xl font-bold text-(--primary-font-color)">
            Your wishlist is empty
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-(--terciary-font-color)">
            Save products you like from their details page and they will be waiting for you here.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-(--dark-button-bg) px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Browse products
          </Link>
        </section>
      ) : (
        <section aria-label="Wishlist items" className="space-y-4">
          {items.map((item) => {
            const product = getProduct(item.apiProduct);
            const isPending = pendingProducts.has(item.apiProduct);

            return (
              <article
                key={item.apiProduct}
                className="flex min-w-0 flex-row items-start gap-3 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm sm:items-center sm:gap-5 sm:p-5"
              >
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-50 p-2 sm:h-32 sm:w-32 sm:p-3">
                  {product ? (
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <PackageOpen size={30} className="text-slate-300" aria-hidden="true" />
                  )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                      {product?.category?.replaceAll("-", " ") ?? "Product"}
                    </p>
                    <h2 className="mt-1 line-clamp-2 font-semibold text-(--primary-font-color)">
                      {product ? (
                        <Link
                          to={`/product/${product.id}`}
                          className="transition-colors hover:text-indigo-600"
                        >
                          {product.title}
                        </Link>
                      ) : (
                        `Product #${item.apiProduct}`
                      )}
                    </h2>
                    <p className="mt-2 text-lg font-bold text-(--primary-font-color)">
                      {product ? formatPrice.format(product.price) : "Price unavailable"}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => addToCart(item)}
                      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-(--dark-button-bg) px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-wait disabled:opacity-60 sm:px-4 sm:text-sm"
                    >
                      <ShoppingBag size={16} aria-hidden="true" />
                      Add to cart
                    </button>
                    <button
                      type="button"
                      aria-label={`Remove ${product?.title ?? "item"} from wishlist`}
                      disabled={isPending}
                      onClick={() => removeItem(item)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 disabled:cursor-wait disabled:opacity-50"
                    >
                      <Trash2 size={18} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}
