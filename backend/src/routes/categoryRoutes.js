import express from "express";
import {
  getCategories,
  getProductsByCategory,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:category", getProductsByCategory);

export default router;
