import Order from "../models/Order.js";
import Product from "../models/Product.js";

// Create Order
const createOrder = async (req, res) => {
  try {
    if (req.user.role !== "shop_owner") {
      return res.status(403).json({ message: "Only shop owners are allowed" });
    }

    const { supplier_id, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order must contain at least one product" });
    }

    // Calculate total price
    let totalPrice = 0;
    for (const item of items) {
      const product = await Product.findById(item.product_id);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product_id}` });
      }
      totalPrice += item.price * item.quantity;
    }

    const order = new Order({
      ...req.body,
      user_id: req.user.id,
      total_price: totalPrice
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Orders (for logged-in shop owner)
const getOrders = async (req, res) => {
  try {
    if (req.user.role !== "shop_owner") {
      return res.status(403).json({ message: "Only shop owners are allowed" });
    }

    const orders = await Order.find({ user_id: req.user.id })
      .populate("supplier_id", "name email phone")
      .populate("items.product_id", "name category price");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Specific Order
const getSpecificOrder = async (req, res) => {
  try {
    if (req.user.role !== "shop_owner") {
      return res.status(403).json({ message: "Only shop owners are allowed" });
    }

    const order = await Order.findOne({ _id: req.params.id, user_id: req.user.id })
      .populate("supplier_id", "name email phone")
      .populate("items.product_id", "name category price");

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Update Order (only status or items)
const updateOrder = async (req, res) => {
  try {
    if (req.user.role !== "shop_owner") {
      return res.status(403).json({ message: "Only shop owners can update orders" });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Order
const deleteOrder = async (req, res) => {
  try {
    if (req.user.role !== "shop_owner") {
      return res.status(403).json({ message: "Only shop owners can delete orders" });
    }

    const order = await Order.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id
    });

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createOrder,
  getOrders,
  getSpecificOrder,
  updateOrder,
  deleteOrder
};