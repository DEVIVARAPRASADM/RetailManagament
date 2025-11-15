// routes/supplierOrderRoutes.js
import express from 'express';
import { authenticationToken } from '../controllers/authController.js';
import {
    getSupplierOrders,
    fetchAllSuppliers,
    shipOrder
} from '../controllers/supplierController.js'; 

const router = express.Router();

router.get('/orders', authenticationToken, getSupplierOrders); 
router.get('/', authenticationToken, fetchAllSuppliers);

router.put('/:id/ship', authenticationToken, shipOrder);

export default router;