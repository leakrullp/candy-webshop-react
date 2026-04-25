type Product = {
  id: number;
  name: string;
  image: string;
  price: number;          // already calculated
  originalPrice: number;
  discount: number;
  country: string;
  brand: string;
};

const ProductCard = ({ product }: { product: Product }) => {
  const handleViewDetails = () => {
    localStorage.setItem("selectedProductId", product.id.toString());
    window.location.href = "/Products/productDetails.html";
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
            New price {product.price.toFixed(2)} kr.
          </p>
        </>
      ) : (
        <p>Price: {product.price} kr.</p>
      )}

      <p>Country: {product.country}</p>
      <p>Brand: {product.brand}</p>

      <button onClick={handleViewDetails}>
        View Details
      </button>

      <button onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;