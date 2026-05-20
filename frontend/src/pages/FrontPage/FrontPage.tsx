import type { LoadProductsProps } from "../../types";
import { useDisplayName } from "../../hooks";
import { ProductBanner, Carousel } from "../../components";

export default function FrontPage({
  products,
  loading,
  error,
}: LoadProductsProps) {
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
