import express from "express";
const router = express.Router();
import { getData, getCurrentPrice, saveData } from "./serverUtil.js";

const data = getData(); //get data once

// GET all products
router.get("/products", (req, res) => {
  const productsWithPrice = data.products.map((p) => ({
    ...p,
    price: getCurrentPrice(p),
  }));

  res.status(200).json({ products: productsWithPrice });
});

// GET product by ID
router.get("/products/:id", (req, res) => {
  const product = data.products.find((p) => p.id === parseInt(req.params.id));

  if (product) {
    res.status(200).json({ ...product, price: getCurrentPrice(product) });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// GET product categories
router.get("/categories", (req, res) => {
  const categories = [...new Set(data.products.map((p) => p.category))];
  res.status(200).json({ categories });
});

// GET products by category
router.get("/categories/:category", (req, res) => {
  const products = data.products
    .filter(
      (p) => p.category.toLowerCase() === req.params.category.toLowerCase(),
    )
    .map((p) => ({ ...p, price: getCurrentPrice(p) }));
  if (products.length === 0) {
    return res
      .status(404)
      .json({ message: "No products found in this category" });
  }
  res.status(200).json({ products });
});

/*
-------------------
BASKET INTERACTIONS 
-------------------
*/

// Create or get existing basket for a customer
router.post("/baskets/:customerId", (req, res) => {
  const existing = data.baskets.find(
    (b) => b.customerId === req.params.customerId,
  );

  if (existing) {
    return res
      .status(200)
      .json({ message: "Basket already exists", basket: existing });
  }

  const newBasket = {
    customerId: req.params.customerId,
    items: [],
  };

  data.baskets.push(newBasket);
  saveData(data);

  res.status(201).json({ message: "Basket created", basket: newBasket });
});

// GET basket for a specific customer
router.get("/baskets/:customerId", (req, res) => {
  const basket = data.baskets.find(
    (b) => b.customerId === req.params.customerId,
  );

  if (!basket) {
    return res.status(404).json({ message: "No basket for this customer" });
  }

  res.status(200).json({ basket });
});

// Add item to basket
router.post("/baskets/:customerId/:productId/:quantity", (req, res) => {
  const productId = parseInt(req.params.productId);
  const quantity = parseInt(req.params.quantity);

  const basket = data.baskets.find(
    (b) => b.customerId === req.params.customerId,
  );

  if (!basket) {
    return res.status(404).json({ message: "Basket not found" });
  }

  const item = basket.items.find((i) => i.productId === productId);

  if (item) {
    item.quantity += quantity; // Increase quantity if item already in basket
  } else {
    basket.items.push({ productId, quantity }); // Add new item
  }

  saveData(data);
  res.status(200).json({ message: "Item added to basket", basket });
});

// Remove item from basket
router.delete("/baskets/:customerId/:productId", (req, res) => {
  const basket = data.baskets.find(
    (b) => b.customerId === req.params.customerId,
  );

  if (!basket) {
    return res.status(404).json({ message: "Basket not found" });
  }

  basket.items = basket.items.filter(
    (item) => item.productId !== parseInt(req.params.productId),
  );
  saveData(data);
  res.status(200).json({ message: "Item removed from basket", basket });
});

export default router;
