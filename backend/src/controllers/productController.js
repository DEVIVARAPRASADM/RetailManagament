import Product from "../models/Product.js";

const createProduct=async(req,res)=>{
    try{
        if (req.user.role !== "shop_owner") {
        return res.status(403).send({ message: "Only shop owners are allowed" });
        }
        const product = new Product({ ...req.body, user_id: req.user.id });
        await product.save();
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).send({message:error.message});
    }
};

const getProducts=async(req,res)=>{
  try {
    const { category } = req.query;
    let filter = { user_id: req.user.id };

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleProduct=async(req,res)=>{
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      user_id: req.user.id,
    });

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProduct=async(req,res)=>{
  try {
    if (req.user.role !== "shop_owner") {
      return res.status(403).json({ message: "Only shop owners can update products" });
    }

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id }, 
      req.body,
      { new: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProduct=async (req, res) => {
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export {createProduct,getProducts,getSingleProduct,updateProduct,deleteProduct};