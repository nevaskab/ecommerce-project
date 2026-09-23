import { useProducts } from "../../contexts/APIContext";
import { Carousel } from "../carousel";

interface ProductCarouselProps {
  productId: number;
}

export function ProductCarousel({ productId }: ProductCarouselProps) {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Carregando produto...</p>;
  if (error) return <p>Erro: {error}</p>;

  const product = products.find((item) => item.id === productId);

  if (!product) return <p>Produto não encontrado.</p>;

  return (
    <>
      <section className="w-full p-4">
        <Carousel images={product.images} />
      </section>
    </>
  );
}
