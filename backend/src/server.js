import express from "express";
import cors from "cors";
import router from "./routes/index.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`
  Server is running on http://localhost:${PORT}

  CUSTOMERS
  GET all customers:               http://localhost:${PORT}/api/customers

  PRODUCTS
  GET  all products:               http://localhost:${PORT}/api/products 
  GET  product by ID:              http://localhost:${PORT}/api/products/:id                              

  CATEGORIES
  GET  all categories:             http://localhost:${PORT}/api/categories
  GET  products by category:       http://localhost:${PORT}/api/categories/:category
  
  COUNTRIES
  GET all countries:               http://localhost:${PORT}/api/countries
  GET country by name:             http://localhost:${PORT}/api/country/:country

  BASKETS
  POST create basket for user:     http://localhost:${PORT}/api/baskets/:customerId                       
  GET  basket for user:            http://localhost:${PORT}/api/baskets/:customerId
  POST add item to basket:         http://localhost:${PORT}/api/baskets/:customerId/:productId/:quantity  
  DEL  remove item from basket:    http://localhost:${PORT}/api/baskets/:customerId/:productId            
  `);
});
