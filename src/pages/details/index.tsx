import { useParams } from "react-router-dom";
import { ProductCarousel } from "../../components/product-carousel";
import { useProducts } from "../../contexts/APIContext";
import { StarRating } from "../../components/star-rating";

export function Details() {
  const { products } = useProducts();
  const { id } = useParams();
  const productId = Number(id);

  if (isNaN(productId)) {
    return <p>ID do produto inválido.</p>;
  }

  return (
    <>
      <div className="m-6">
        <h1 className="text-3xl font-semibold my-2">Product Details</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <ProductCarousel productId={productId} />
          <div>
            <h2 className="text-2xl font-black my-2">{products[0]?.title}</h2>
            <StarRating rating={products[0]?.rating} />
            <p className="text-xl ">
              Price: <strong>${products[0]?.price.toFixed(2)}</strong>
            </p>
            <p className="text-sm text-(--terciary-font-color) my-2">
              {products[0]?.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
