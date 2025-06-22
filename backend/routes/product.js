import express from 'express';
import { productController } from '../controller/productController.js';
const router = express.Router();

router.get("/most-sold", productController.getMostSoldProducts);

export default router;