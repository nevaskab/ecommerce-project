import { Banner } from "../../components/banner";
import ProductCard from "../../components/product-card";
import { PromoBanner } from "../../components/promo-banner";
import { ProductProvider } from "../../contexts/APIContext";

export function Home() {
  return (
    <>
      <Banner />
      <ProductProvider>
        <ProductCard />
      </ProductProvider>
      <PromoBanner />
    </>
  );
}
