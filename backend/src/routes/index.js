import express from "express";
import productRouter from "./productRoutes.js";
import basketRouter from "./basketRoutes.js";

const router = express.Router();

router.use(productRouter);
router.use(basketRouter);

export default router;