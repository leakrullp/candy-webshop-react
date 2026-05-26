import { useEffect, useState } from "react";
import { fetchProducts } from "../../services/productsService";
import { getCurrentPrice } from "../../utils/priceUtils";
import type { Product } from "../../types";
import { handleAddToCart } from "../../utils/cartUtils";
import "./ProductDetailPage.css";

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      const products = await fetchProducts();

      const selectedProductId = Number(
        localStorage.getItem("selectedProductId"),
      );

      const foundProduct = products.find((p) => p.id === selectedProductId);

      if (foundProduct) {
        setProduct(foundProduct);
      }
    };

    loadProduct();
  }, []);

  if (!product) {
    return <p>Loading product...</p>;
  }

  const price = getCurrentPrice(product);

  return (
    <main id="full-container">
      <img id="product-image" src={product.image} alt={product.name} />

      <div id="product-details-container">
        <h1 id="product-name">{product.name}</h1>

        <h2 id="product-price">Price: {price.toFixed(2)} kr.</h2>

        <p>Country: {product.country}</p>

        <p>Weight: {product.weight}g</p>

        <p>Brand: {product.brand}</p>

        <p>{product.description}</p>

        <button onClick={() => handleAddToCart(product.id)} id="add-to-cart-btn">Add to Cart</button>
      </div>
    </main>
  );
}
