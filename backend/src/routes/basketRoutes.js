import express from "express";
import {
  addItemToBasket,
  createBasketForCustomer,
  createBasketForEmail,
  getBasketForCustomer,
  removeItemFromBasket,
} from "../controllers/basketController.js";

const router = express.Router();

router.post("/baskets/:customerId", createBasketForCustomer);
router.post("/baskets/:email", createBasketForEmail);
router.get("/baskets/:customerId", getBasketForCustomer);
router.post("/baskets/:customerId/:productId/:quantity", addItemToBasket);
router.delete("/baskets/:customerId/:productId", removeItemFromBasket);

export default router;