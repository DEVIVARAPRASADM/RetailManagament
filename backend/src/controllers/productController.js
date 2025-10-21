import Product from "../models/Product.js";

import path from "path";
// Create Product
const createProduct = async (req, res) => {
  try {
    if (req.user.role !== "shop_owner") {
      return res.status(403).json({ message: "Only shop owners are allowed" });
    }

    let imageUrl = "";
    if (req.file) {
      imageUrl = `uploads/${req.file.filename}`; // relative path
    }

    const product = new Product({
      ...req.body,
      user_id: req.user.id,
      image_url: imageUrl,
    });

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update poduct
const updateProduct = async (req, res) => {
  try {
    // Role check
    if (req.user.role !== "shop_owner") {
      return res.status(403).json({ message: "Only shop owners can update products" });
    }

    // Directly use req.body to prevent accidental modifications
    const updatedData = req.body; 

    // Handle image update if a new file is provided
    if (req.file) {
      updatedData.image_url = `uploads/${req.file.filename}`;
    }

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id }, // The query to find the product
      updatedData,                                   // The data to update with
      { new: true, runValidators: true }             // Options: return the new doc, run schema validators
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found or you are not the owner" });
    }

    res.status(200).json(product);
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
