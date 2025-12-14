// controllers/supplierOrderController.js
import Order from '../models/Order.js';
import Supplier from '../models/Supplier.js';
import User from "../models/User.js";
import mongoose from 'mongoose';

const checkSupplierRole = (req, res) => {
    if (req.user.role !== "Supplier") {
        res.status(403).json({ message: "Access forbidden: Only Suppliers can perform this action." });
        return false;
    }
    return true;
}

export const fetchAllSuppliers = async (req, res) => {
    try {
        console.log("heloo")

        const suppliers = await User.find({ role: 'Supplier' })
            .select('_id business_name email');
        
        console.log(suppliers)
        res.status(200).json(suppliers);

    } catch (error) {
        console.error("Error fetching all suppliers:", error.message);
        res.status(500).json({ message: 'Server error while fetching supplier list.' });
    }
}

export const getSupplierOrders = async (req, res) => {
    try {
        // 1. Security check
        if (req.user.role !== "Supplier") {
            return res.status(403).json({ message: "Access forbidden: Only Suppliers can view orders." });
        }

        // 2. Get the logged-in supplier's USER ID
        const supplierUserId = req.user.id;
        
        // --- DEBUGGING LOGS ---
        console.log(`--- Searching for orders for Supplier User ID: ${supplierUserId} ---`);
        console.log(`Type of ID: ${typeof supplierUserId}`);

        // 3. Directly query the Order collection.
        //    We explicitly convert the string ID to a Mongoose ObjectId to ensure a perfect match.
        const orders = await Order.find({
                supplier_id: new mongoose.Types.ObjectId(supplierUserId), // <-- Bulletproof matching
                 // Let's simplify to only 'processing' for this test
            })
            .populate('user_id', 'business_name') // Get the buyer's name
            .sort({ created_at: -1 });

        // --- MORE DEBUGGING LOGS ---
        console.log(`Found ${orders.length} processing orders.`);
        
        // 4. Format the data for the frontend
        const formattedOrders = orders.map(order => {
            const orderObject = order.toObject();
            return {
                ...orderObject,
                buyer_name: orderObject.user_id ? orderObject.user_id.business_name : 'Unknown Buyer'
            };
        });
        
        console.log('--- Sending Formatted Orders to Frontend ---');
        console.log(JSON.stringify(formattedOrders, null, 2));

        res.status(200).json(formattedOrders);

    } catch (error) {
        console.error("!!! CRITICAL ERROR in getSupplierOrders:", error.message);
        res.status(500).json({ message: 'Server error while fetching supplier orders.' });
    }
};

export const shipOrder = async (req, res) => {
  try {
    console.log("===== SHIP ORDER CALLED =====");
    console.log("Order ID from URL:", req.params.id);
    console.log("Logged-in supplier user ID:", req.user.id);

    if (!checkSupplierRole(req, res)) return;

    const supplierId = req.user.id;
    const orderId = req.params.id;

    // Find order that belongs to this supplier
    const order = await Order.findOne({
      _id: orderId,
      supplier_id: supplierId,
      status: "processing"
    });

    console.log("Order found:", order);

    if (!order) {
      return res.status(404).json({
        message:
          "Order not found — supplier_id mismatch OR order is already shipped"
      });
    }

    order.status = "shipped";
    await order.save();

    return res.status(200).json({ message: "Order shipped", order });

  } catch (error) {
    console.error("SHIP ORDER ERROR:", error);
    return res.status(500).json({ message: "Server error during shipping" });
  }
};
