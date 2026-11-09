import { useState } from "react";
import { Banner } from "../../components/banner";
import { Category } from "../../components/category";
import ProductCard from "../../components/product-card";
import { PromoBanner } from "../../components/promo-banner";

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <Banner />
      <Category
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <ProductCard selectedCategory={selectedCategory} />
      <PromoBanner />
    </>
  );
}
