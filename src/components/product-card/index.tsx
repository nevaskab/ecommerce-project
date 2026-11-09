import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../../contexts/APIContext";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { getApiErrorMessage } from "../../services/apiError";
import { StarRating } from "../star-rating";

const formatPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});


export default function ProductCard({
  selectedCategory,
}: {
  selectedCategory: string | null;
}) {
  const { products, error } = useProducts();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [addingProductId, setAddingProductId] = useState<number | null>(null);
  const [cartError, setCartError] = useState<string | null>(null);
  const visibleProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const handleAddToCart = async (productId: number) => {
    if (!user) {
      navigate("/login", { state: { from: `/product/${productId}` } });
      return;
    }

    setAddingProductId(productId);
    setCartError(null);

    try {
      await api.post("/cart", { productId, quantity: 1 });
      navigate("/cart");
    } catch (requestError) {
      setCartError(
        getApiErrorMessage(
          requestError,
          "Could not add this product to your cart. Please try again.",
        ),
      );
    } finally {
      setAddingProductId(null);
    }
  };

  if (error) return <p>Error: {error}</p>;
  
  return (
    <>
      {cartError && (
        <p role="alert" className="mx-4 mt-4 rounded-xl bg-rose-50 px-4 py-3 text-center text-sm text-rose-700">
          {cartError}
        </p>
      )}
      <div className="grid grid-cols-2 items-stretch gap-3 px-4 py-8 sm:gap-5 sm:px-6 sm:py-10 lg:grid-cols-4 lg:px-8 lg:py-16">
        {visibleProducts.map((product) => (
          <article
            key={product.id}
            className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-4"
          >
            <Link
              to={`/product/${product.id}`}
              className="flex flex-1 flex-col focus-visible:rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <div className="mb-3">
                <StarRating rating={product.rating} />
              </div>
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-3 sm:p-5">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  loading="lazy"
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h3 className="mt-4 min-h-10 line-clamp-2 text-left text-sm font-semibold text-(--primary-font-color) sm:text-base">
                {product.title}
              </h3>
              <p className="mt-3 font-bold text-(--primary-font-color)">
                {formatPrice.format(product.price)}
              </p>
            </Link>
            <button
              onClick={() => handleAddToCart(product.id)}
              disabled={addingProductId === product.id}
              aria-busy={addingProductId === product.id}
              className="mt-3 cursor-pointer rounded-xl bg-(--dark-button-bg) px-4 py-2.5 text-(--primary-color) transition-colors hover:bg-(--light-button-bg) hover:text-(--primary-font-color) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-wait disabled:opacity-60"
            >
              {addingProductId === product.id ? "Adding..." : "Buy Now"}
            </button>
          </article>
        ))}
        {products.length > 0 && visibleProducts.length === 0 && (
          <p className="col-span-full rounded-2xl border border-slate-200 bg-white p-5 text-slate-600">
            No products are available in this category right now.
          </p>
        )}
      </div>
    </>
  );
}
