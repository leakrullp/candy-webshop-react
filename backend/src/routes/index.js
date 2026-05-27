import express from "express";
import productRouter from "./productRoutes.js";
import basketRouter from "./basketRoutes.js";
import customerRouter from "./customerRoutes.js";

const router = express.Router();

router.use("/products", productRouter);
router.use("/baskets", basketRouter);
router.use("/customers", customerRouter);

export default router;