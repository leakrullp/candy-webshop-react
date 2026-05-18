import { ProductBanner } from "../../components";
import Carousel from "../../components/Carousel";
import useDisplayName from "../../utils/useDisplayName";
import useProducts from "../../utils/useProducts";

export default function FrontPage() {
  const { products, loading, error } = useProducts();
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
