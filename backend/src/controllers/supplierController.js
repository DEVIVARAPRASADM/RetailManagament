import Supplier from "../models/Supplier.js";

const createSupplier=async(req,res)=>{
   try {
    console.log("Decoded user from token:", req.user);

    if (req.user.role !== "shop_owner") {
      return res.status(403).json({ message: "Only shop owners are allowed" });
    }

    const supplier = new Supplier({ ...req.body, user_id: req.user.id });
    await supplier.save();
    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSuppliers=async(req,res)=>{
    try{
        let filter = { user_id: req.user.id };
        const suppliers=await Supplier.find(filter);
        res.json(suppliers);
    }
    catch(error){
        res.status(500).json({"message":error.message});
    }
};


const getSingleSupplier=async(req,res)=>{
  try {
    const supplier = await Supplier.findOne({
      _id: req.params.id,
      user_id: req.user.id,
    });

    if (!supplier) return res.status(404).json({ message: "supplier not found" });
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};


const updateSupplier = async (req, res) => {
  try {
    if (req.user.role !== "shop_owner") {
      return res.status(403).json({ message: "Only shop owners can update supplier" });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const supplier = await Supplier.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id }, 
      req.body,
      { new: true, runValidators: true } 
    );

    if (!supplier) {
      return res.status(404).json({ message: "supplier not found" });
    }

    res.status(200).json(supplier);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const deleteSupplier=async (req, res) => {
  try {
    if (req.user.role !== "shop_owner") {
      return res.status(403).json({ message: "Only shop owners can delete supplier" });
    }

    const supplier = await Supplier.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id, 
    });

    if (!supplier) return res.status(404).json({ message: "supplier not found" });
    res.json({ message: "supplier deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export {createSupplier,getSuppliers,getSingleSupplier,updateSupplier,deleteSupplier};