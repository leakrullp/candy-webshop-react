import type { LoadProductsProps } from "../../types";
import { ProductBanner, Carousel } from "../../components";
import "./FrontPage.css";

export default function FrontPage({
  products,
  loading,
  error,
  currentUser,
}: LoadProductsProps) {
  const name = currentUser?.firstname ? currentUser?.firstname : null;

  return (
    <>
      <main className="container mt-5"></main>
      {error && <p>{error}</p>}

      {!loading && (
        <>
          <header className="text-center mb-5"></header>
          <h2 className="display-4 fw-bold" id="welcome-header">
            {name
              ? `Welcome to a world of candy, ${name}!!`
              : "Welcome to a world of candy"}
          </h2>

          <Carousel />
          <ProductBanner
            currentUser={currentUser}
            products={products}
            title="On sale"
            filter={(p) => p.discount > 0}
          />
          <ProductBanner
            currentUser={currentUser}
            products={products}
            title="Danish products"
            filter={(p) => p.country === "Denmark"}
          />
        </>
      )}
    </>
  );
}
