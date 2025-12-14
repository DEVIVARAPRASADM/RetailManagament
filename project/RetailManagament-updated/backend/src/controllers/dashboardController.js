import Product from '../models/Product.js';
import Sale from '../models/Sale.js';
import mongoose from 'mongoose'; // Import mongoose to use ObjectId

export const getDashboardStats = async (req, res) => {
  try {
    // --- Use mongoose.Types.ObjectId to ensure the type is correct ---
    const ownerId = new mongoose.Types.ObjectId(req.user.id);

    console.log("--- DEBUG: Fetching stats for user:", ownerId, "---");

    // --- 1. Get Total Products ---
    const totalProducts = await Product.countDocuments({ user_id: ownerId });

    // --- 2. Get Today's Sales (More robust date logic) ---
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(startOfToday);
    endOfToday.setDate(endOfToday.getDate() + 1);

    console.log("DEBUG: Searching for sales in date range:", startOfToday.toISOString(), "to", endOfToday.toISOString());

    const salesTodayResult = await Sale.aggregate([
      { 
        $match: { 
          user_id: ownerId, 
          saleDate: { $gte: startOfToday, $lt: endOfToday } 
        } 
      },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    console.log("DEBUG: Aggregation result for sales:", salesTodayResult);

    const todaysSales = salesTodayResult.length > 0 ? salesTodayResult[0].total : 0;

    // --- 3. Get Low Stock Alerts ---
    const lowStockCount = await Product.countDocuments({ user_id: ownerId, stock: { $lte: 10 } });

    // --- 4. Get Recent Sales ---
    const recentActivity = await Sale.find({ user_id: ownerId })
      .sort({ saleDate: -1 })
      .limit(5)
      .populate('productId', 'name category');

    console.log("--- DEBUG: Final stats object:", { totalProducts, todaysSales, lowStockCount, recentActivity }, "---");

    res.status(200).json({
      totalProducts,
      todaysSales,
      lowStockCount,
      recentActivity,
    });
  } catch (error) {
    console.error("ERROR in getDashboardStats:", error); // Log the full error
    res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
  }
};