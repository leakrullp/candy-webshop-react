import express from "express";
import {
  addItemToBasket,
  createBasketForCustomer,
  createBasketForEmail,
  getBasketForCustomer,
  removeItemFromBasket,
} from "../controllers/basketController.js";

const router = express.Router();

router.post("/:customerId", createBasketForCustomer);
router.post("/:email", createBasketForEmail);
router.get("/:customerId", getBasketForCustomer);
router.post("/:customerId/:productId/:quantity", addItemToBasket);
router.delete("/:customerId/:productId", removeItemFromBasket);

export default router;