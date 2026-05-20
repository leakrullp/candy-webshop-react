import express from "express";
import cors from "cors";
import router from "./routes.js";

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json()); // Parse JSON request bodies

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`
  Server is running on http://localhost:${PORT}

  PRODUCTS
  GET  all products:               http://localhost:${PORT}/api/products 
  GET  product by ID:              http://localhost:${PORT}/api/products/:id                              ex: http://localhost:${PORT}/api/products/1

  CATEGORIES
  GET  all categories:             http://localhost:${PORT}/api/categories
  GET  products by category:       http://localhost:${PORT}/api/categories/:category                      ex: http://localhost:${PORT}/api/categories/gummies

  BASKETS
  POST create basket for user:     http://localhost:${PORT}/api/baskets/:customerId                       ex: http://localhost:${PORT}/api/baskets/1
  GET  basket for user:            http://localhost:${PORT}/api/baskets/:customerId
  POST add item to basket:         http://localhost:${PORT}/api/baskets/:customerId/:productId/:quantity  ex: http://localhost:${PORT}/api/baskets/1/1/1
  DEL  remove item from basket:    http://localhost:${PORT}/api/baskets/:customerId/:productId            ex: http://localhost:${PORT}/api/baskets/1/1
  `);
});
