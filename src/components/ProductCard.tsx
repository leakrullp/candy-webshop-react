import {
  calculateDiscountedPrice,
  type Product,
} from "../services/productsService";

const ProductCard = ({ product }: { product: Product }) => {
  const price = calculateDiscountedPrice(product);

  const handleViewDetails = () => {
    localStorage.setItem("selectedProductId", product.id.toString());
    window.location.href = "/Products/productDetails.html"; //this won't work as we don't have that HTML page
  };

  const handleAddToCart = async () => {
    //const { addToCart } = await import("../utils/cartUtils");
    //addToCart(product.id);
  };

  return (
    <div className="product-card">
      <h2>{product.name}</h2>

      <img src={product.image} width={200} alt={product.name} />

      {product.discount > 0 ? (
        <>
          <p>
            <del>Old price: {product.originalPrice} kr.</del>
          </p>
          <p style={{ backgroundColor: "#ffff00" }}>
            New price {price.toFixed(2)} kr.
          </p>
        </>
      ) : (
        <p>Price: {price.toFixed(2)} kr.</p>
      )}

      <p>Country: {product.country}</p>
      <p>Brand: {product.brand}</p>

      <button onClick={handleViewDetails}>View Details</button>

      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
