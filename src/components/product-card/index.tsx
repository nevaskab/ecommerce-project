import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../contexts/APIContext";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { getApiErrorMessage } from "../../services/apiError";
import { StarRating } from "../star-rating";


export default function ProductCard() {
  const { products, error } = useProducts();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [addingProductId, setAddingProductId] = useState<number | null>(null);
  const [cartError, setCartError] = useState<string | null>(null);

  const handleAddToCart = async (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: number,
  ) => {
    e.stopPropagation();

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

  const handleGoToProduct = (product: { id: number }) => {
    navigate(`/product/${product.id}`);
  };

  if (error) return <p>Error: {error}</p>;
  
  return (
    <>
      {cartError && (
        <p role="alert" className="mx-4 mt-4 rounded-xl bg-rose-50 px-4 py-3 text-center text-sm text-rose-700">
          {cartError}
        </p>
      )}
      <div className="grid grid-cols-2 lg:grid-cols-4 lg:px-40 lg:py-20 justify-items-center">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleGoToProduct(product)}
            className="cursor-pointer max-w-67 max-h-108 min-w-41 min-h-88 p-4 m-4 bg-(--product-bg) rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 flex flex-col justify-between relative overflow-hidden after:content-['See_Details'] after:text-[#ffffff00] after:text-lg after:flex after:justify-center after:items-center after:absolute after:inset-0 after:bg-[#1e293900] hover:after:text-[#ffffff] hover:after:bg-[#1e2939c5] after:transition-all after:duration-300"
          >
            <StarRating rating={product.rating} />
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full z-0 object-cover rounded-lg mb-4"
            />

            <h3 className="text-center font-bold text-(--text-primary)">
              {product.title}
            </h3>
            <p className="text-center font-medium p-2">${product.price}</p>
            <button
              onClick={(e) => handleAddToCart(e, product.id)}
              disabled={addingProductId === product.id}
              aria-busy={addingProductId === product.id}
              className="cursor-pointer bg-(--dark-button-bg) text-(--primary-color) py-2 px-4 rounded-lg hover:bg-(--light-button-bg) hover:text-(--primary-font-color) transition-colors relative z-10 disabled:cursor-wait disabled:opacity-60"
            >
              {addingProductId === product.id ? "Adding..." : "Buy Now"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
