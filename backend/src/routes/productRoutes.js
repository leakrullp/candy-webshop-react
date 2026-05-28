import express from "express";
import {
  getAllProducts,
  getCategories,
  getCountries,
  getProductById,
  getProductsByCategory,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);

export default router;
