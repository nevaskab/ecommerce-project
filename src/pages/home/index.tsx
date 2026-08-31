import { Banner } from "../../components/banner";
import { Category } from "../../components/category";
import ProductCard from "../../components/product-card";
import { PromoBanner } from "../../components/promo-banner";

export function Home() {
  return (
    <>
      <Banner />
      <Category />
      <ProductCard />
      <PromoBanner />
    </>
  );
}
