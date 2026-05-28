import express from "express";
import {
  getAllCustomers,
  loginCustomer,
  registerCustomer,
} from "../controllers/customerController.js";

const router = express.Router();

router.get("/", getAllCustomers);
router.post("/login", loginCustomer);
router.post("/register", registerCustomer);

export default router;