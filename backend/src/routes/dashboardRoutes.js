import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';
import { authenticationToken } from '../controllers/authController.js'; // Your auth middleware
const router = express.Router();
router.get('/stats', authenticationToken, getDashboardStats);
export default router;