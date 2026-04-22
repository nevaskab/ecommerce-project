import { useProducts } from "../../contexts/APIContext";

export default function ProductCard() {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <div className="grid grid-cols-4 px-40 py-20">
        {products.map((product) => (
          <div
            key={product.id}
            className="max-w-67 max-h-108 min-w-[163.5px] min-h-88 p-4 m-4 bg-(--product-bg) rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 flex flex-col justify-between"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full"
            />
            <h3 className="text-center font-bold text-(--text-primary)">
              {product.title}
            </h3>
            <p className="text-center font-medium">
              ${product.price}
            </p>
            <button className="bg-(--dark-button-bg) text-(--primary-color) py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors">Buy Now</button>
          </div>
        ))}
      </div>
    </>
  );
}
