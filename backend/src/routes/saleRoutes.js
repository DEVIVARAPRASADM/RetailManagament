import express from 'express';
import { createSaleTransaction ,getDailySales,getProductDemand,
    runSalesForecast
}from '../controllers/salesController.js';
import { authenticationToken } from '../controllers/authController.js';

const router = express.Router();

// This route handles the entire sale transaction
router.post('/', authenticationToken, createSaleTransaction);
router.get("/daily",authenticationToken, getDailySales);

//  Product demand forecast
router.get("/demand", authenticationToken, getProductDemand);

router.get("/predict", runSalesForecast);

export default router;