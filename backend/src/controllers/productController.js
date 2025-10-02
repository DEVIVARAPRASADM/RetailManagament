import Product from "../models/Product.js";

// Create Product
const createProduct = async (req, res) => {
  try {
    console.log("Decoded user from token:", req.user);

    if (req.user.role !== "shop_owner") {
      return res.status(403).json({ message: "Only shop owners are allowed" });
    }

    const product = new Product({ ...req.body, user_id: req.user.id });
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get All Products
const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = { user_id: req.user.id };

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get Single Product
const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      user_id: req.user.id,
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Update Product
const updateProduct = async (req, res) => {
  try {
    if (req.user.role !== "shop_owner") {
      return res.status(403).json({ message: "Only shop owners can update products" });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Delete Product
const deleteProduct = async (req, res) => {
  try {
    if (req.user.role !== "shop_owner") {
      return res.status(403).json({ message: "Only shop owners can delete products" });
    }

    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id,
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createProduct, getProducts, getSingleProduct, updateProduct, deleteProduct };
