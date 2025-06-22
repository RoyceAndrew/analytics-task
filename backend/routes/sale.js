import express from 'express';
import { saleController } from '../controller/saleController.js';
const router = express.Router();

router.get("/discount-vs-quantity", saleController.discountVsQuantity);

router.get("/quantity-by-state", saleController.quantityByStateAndProduct);

export default router;