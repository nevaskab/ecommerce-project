import { Banner } from "../../components/banner";
import { Category } from "../../components/category";
import ProductCard from "../../components/product-card";
import { PromoBanner } from "../../components/promo-banner";
import { ProductProvider } from "../../contexts/APIContext";

export function Home() {
  return (
    <>
      <Banner />
      <ProductProvider>
        <Category />
        <ProductCard />
      </ProductProvider>
      <PromoBanner />
    </>
  );
}
