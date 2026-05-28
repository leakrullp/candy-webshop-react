import express from "express";
import productRouter from "./productRoutes.js";
import basketRouter from "./basketRoutes.js";
import customerRouter from "./customerRoutes.js";
import categoryRouter from "./categoryRoutes.js";

const router = express.Router();

router.use("/products", productRouter);
router.use("/baskets", basketRouter);
router.use("/customers", customerRouter);
router.use("/categories", categoryRouter);

export default router;