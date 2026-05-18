import { ProductBanner } from "../../components";
import Carousel from "../../components/Carousel";
import useDisplayName from "../../utils/useDisplayName";
import type { Product } from "../../types";

type Props = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

export default function FrontPage({ products, loading, error }: Props) {
  const name = useDisplayName();

  return (
    <>
      <main className="container mt-5"></main>
      {error && <p>{error}</p>}
      {!loading && (
        <>
          <header className="text-center mb-5"></header>
          <h1 className="display-4 fw-bold" id="welcome-header">
            {name
              ? `Welcome to a world of candy, ${name}!!`
              : "Welcome to a world of candy"}
          </h1>

          <Carousel />
          <ProductBanner
            products={products}
            title="On sale"
            filter={(p) => p.discount > 0}
          />
          <ProductBanner
            products={products}
            title="Danish products"
            filter={(p) => p.country === "Denmark"}
          />
        </>
      )}
    </>
  );
}
