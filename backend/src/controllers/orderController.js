// controllers/orderController.js
import Order from "../models/Order.js";
import Product from "../models/Product.js"; // Assume this is available
import Supplier from '../models/Supplier.js'; 

// Helper to check user role
const checkShopOwner = (req, res) => {
    if (req.user.role !== "shop_owner") {
      res.status(403).json({ message: "Only shop owners are allowed" });
      return false;
    }
    return true;
}

export const createOrder = async (req, res) => {
  try {
    if (!checkShopOwner(req, res)) return;

    const { supplier_id, items } = req.body;
    
    if (!items || items.length === 0 || !supplier_id) {
      return res.status(400).json({ message: "Supplier and order items are required" });
    }

    // Server-side validation of item details and total_price calculation
    let totalPrice = 0;
    for (const item of items) {
      // NOTE: For a clean flow, the product must exist in the database
      const product = await Product.findById(item.product_id); 
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product_id}` });
      }
      totalPrice += item.price * item.quantity;
    }

    const order = new Order({
      ...req.body,
      user_id: req.user.id,
      total_price: totalPrice // Total price is calculated explicitly here
    });

    await order.save(); // Pre-save hook will run and update total_price/updated_at
    res.status(201).json({ message: 'Purchase Order created successfully', order });
  } catch (error) {
    console.error("Error in createOrder:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// 2. GET All Orders
export const getOrders = async (req, res) => {
  try {
    if (!checkShopOwner(req, res)) return;

    const orders = await Order.find({ user_id: req.user.id })
      .sort({ created_at: -1 })
      // FIX: Use 'business_name' instead of 'name' for Supplier population
      .populate("supplier_id", "business_name email phone") 
      .populate("items.product_id", "name category price");

    res.status(200).json(orders);
    console.log(orders);
  } catch (error) {
    console.error("Error in getOrders:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// 3. GET Specific Order
export const getSpecificOrder = async (req, res) => {
  try {
    if (!checkShopOwner(req, res)) return;

    const order = await Order.findOne({ _id: req.params.id, user_id: req.user.id })
      // FIX: Use 'business_name' instead of 'name' for Supplier population
      .populate("supplier_id", "business_name email phone")
      .populate("items.product_id", "name category price");

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    console.error("Error in getSpecificOrder:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// 4. UPDATE Order (for status other than 'delivered', or editing items before being sent)
export const updateOrder = async (req, res) => {
  try {
    if (!checkShopOwner(req, res)) return;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }
    
    // NOTE: If items are updated, the pre-save hook handles total_price recalculation

    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: 'Order updated successfully', order });
  } catch (error) {
    console.error("Error in updateOrder:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// 5. RECEIVE Order (CRITICAL: Updates Stock)
export const receiveOrder = async (req, res) => {
    try {
        if (!checkShopOwner(req, res)) return;

        const orderId = req.params.id;
        const order = await Order.findOne({ _id: orderId, user_id: req.user.id });

        if (!order) return res.status(404).json({ message: "Order not found" });
        if (order.status !== "shipped" && order.status !== "processing") { // Only receive if 'processing' or 'shipped'
            return res.status(400).json({ message: `Order cannot be delivered from status: ${order.status}` });
        }

        // 1. Increment stock for all products
        const updatePromises = order.items.map(item => {
            return Product.findByIdAndUpdate(
                item.product_id,
                { $inc: { stock: item.quantity } },
                { new: true }
            );
        });
        await Promise.all(updatePromises);
        
        // 2. Update Order status
        order.status = 'delivered';
        await order.save();

        res.status(200).json({ 
            message: `Order ${orderId} received and inventory updated successfully.`,
            order: order
        });

    } catch (error) {
        console.error("Error receiving order:", error);
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

// 6. DELETE Order
export const deleteOrder = async (req, res) => {
  try {
    if (!checkShopOwner(req, res)) return;

    const order = await Order.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id
    });

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error in deleteOrder:", error.message);
    res.status(500).json({ message: error.message });
  }
};