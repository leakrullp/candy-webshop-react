import { getData, getCurrentPrice } from "../serverUtil.js";

const data = getData(); //get data once

export const getAllProducts = (req, res) => {
  const productsWithPrice = data.products.map((p) => ({
    ...p,
    price: getCurrentPrice(p),
  }));

  res.status(200).json({ products: productsWithPrice });
};

export const getProductById = (req, res) => {
  const product = data.products.find((p) => p.id === parseInt(req.params.id));

  if (product) {
    res.status(200).json({ ...product, price: getCurrentPrice(product) });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

export const getCategories = (req, res) => {
  const categories = [...new Set(data.products.map((p) => p.category))];
  res.status(200).json({ categories });
};

export const getProductsByCategory = (req, res) => {
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
};