import { Banner } from "../../components/banner";
import { Category } from "../../components/category";
import { Loading } from "../../components/loading";
import ProductCard from "../../components/product-card";
import { PromoBanner } from "../../components/promo-banner";
import { ProductProvider } from "../../contexts/APIContext";
import { useAuth } from "../../contexts/AuthContext";

export function Home() {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

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
