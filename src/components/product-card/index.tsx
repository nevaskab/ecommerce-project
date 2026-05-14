import { useNavigate } from "react-router-dom";
import { useProducts } from "../../contexts/APIContext";

export default function ProductCard() {
  const { products, loading, error } = useProducts();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate("/cart");
  }

  const handleGoToProduct = (product: { id: number; }) => {
    navigate(`/product/${product.id}`);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 lg:px-40 lg:py-20 justify-items-center">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleGoToProduct(product)}
            className="cursor-pointer max-w-67 max-h-108 min-w-41 min-h-88 p-4 m-4 bg-(--product-bg) rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 flex flex-col justify-between relative overflow-hidden after:content-['See_Details'] after:text-[#ffffff00] after:text-lg after:flex after:justify-center after:items-center after:absolute after:inset-0 after:bg-[#1e293900] hover:after:text-[#ffffff] hover:after:bg-[#1e2939c5] after:transition-all after:duration-300"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full z-0 object-cover rounded-lg mb-4"
            />
            
            <h3 className="text-center font-bold text-(--text-primary)">
              {product.title}
            </h3>
            <p className="text-center font-medium p-2">
              ${product.price}
            </p>
            <button 
              onClick={(e) => handleAddToCart(e)}
              className="cursor-pointer bg-(--dark-button-bg) text-(--primary-color) py-2 px-4 rounded-lg hover:bg-(--light-button-bg) hover:text-(--primary-font-color) transition-colors relative z-10">
                Buy Now
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
