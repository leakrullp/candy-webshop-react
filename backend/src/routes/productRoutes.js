import express from "express";
import {
  getAllProducts,
  getCategories,
  getCountries,
  getProductById,
  getProductsByCategory,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.get("/categories", getCategories);
router.get("/categories/:category", getProductsByCategory);
router.get("/countries", getCountries);

export default router;
