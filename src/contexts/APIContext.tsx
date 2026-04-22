import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface ProductProps {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
  }
  thumbnail: string;
  images: string[];
}

interface ProductContextData {
  products: ProductProps[];
  loading: boolean;
  error: string | null;
  refreshProducts: (page: number) => Promise<void>;
}

const ProductContext = createContext<ProductContextData>(
  {} as ProductContextData,
);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (page: number) => {
    const categories = ["smartphones", "tablets", "mobile-accessories"];
    const limit = 12;
    const skip = (page - 1) * limit;

    try {
      const request = categories.map(async (cat) => {
        const response = await fetch(
          `https://dummyjson.com/products/category/${cat}?limit=${limit}&skip=${skip}`,
        );
        if (!response.ok)
          throw new Error(`Failed to fetch products for category ${cat}`);
        return response.json();
      });
      const results = await Promise.all(request);
      const allProducts = results.flatMap((data) => data.products);

      if (allProducts.length === 0) throw new Error("No more products to load");

      setProducts(allProducts);

      setLoading(true);
      setError(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, loading, error, refreshProducts: fetchProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => useContext(ProductContext);
