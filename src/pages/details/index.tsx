import { useProducts } from "../../contexts/APIContext";

export function Details() {
  const { products } = useProducts();

  return (
    <>
      <div>
        <h1>{products[0]?.title}</h1>
      </div>
    </>
  );
}
