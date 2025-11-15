import Product from "../models/Product.js";

const checkUserRole = (req, ...allowedRoles) => allowedRoles.includes(req.user.role);

export const createProduct = async (req, res) => {
  try {
    const isAdmin = req.user.role === 'admin';
    const isShopOwner = req.user.role === 'shop_owner';

    if (!isAdmin && !isShopOwner) {
        return res.status(403).json({ message: "Access forbidden: Insufficient privileges." });
    }
    let imageUrl = "";
    if (req.file) {
      imageUrl = `uploads/${req.file.filename}`;
    }
    const product = new Product({
      ...req.body,
      user_id: req.user.id,
      image_url: imageUrl,
      is_master_product: isAdmin // CRITICAL: Flag set by Admin role
    });

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ message: error.message });
  }
};


// 2. Get Products for Inventory Page (Only local, shop owner's own inventory)
export const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = { 
      user_id: req.user.id,
      is_master_product: { $ne: true } 
    };

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting local products:", error.message);
    res.status(500).json({ message: error.message });
  }
};


// 3. NEW CRITICAL FUNCTION: Get Products for Order Catalog (Discovery/Global View)
export const getDiscoveryProducts = async (req, res) => {
    try {
        if (!checkUserRole(req, 'shop_owner', 'admin')) {
            return res.status(403).json({ message: "Access forbidden." });
        }

        // Fetch Master Catalog AND current user's local products
        const discoverableProducts = await Product.find({
            $or: [
                { is_master_product: true }, 
                { user_id: req.user.id, is_master_product: false }
            ]
        })
        .select('-__v'); 

        res.status(200).json(discoverableProducts);

    } catch (error) {
        console.error("Error fetching discovery products:", error.message);
        res.status(500).json({ message: "Server error during product discovery." });
    }
};

// 4. Update Product (Combined Logic for Owner/Admin)
export const updateProduct = async (req, res) => {
  try {
    if (!checkUserRole(req, 'shop_owner', 'admin')) {
      return res.status(403).json({ message: "Access forbidden" });
    }

    const updatedData = req.body; 

    if (req.file) { updatedData.image_url = `uploads/${req.file.filename}`; }

    // CRITICAL: Ensure ONLY the product owner can update their product (unless admin has an explicit role here)
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      updatedData,                                  
      { new: true, runValidators: true }             
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found or you are not the owner" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 5. Delete Product (Shop Owner/Admin Logic)
export const deleteProduct = async (req, res) => {
  try {
    if (!checkUserRole(req, 'shop_owner', 'admin')) {
      return res.status(403).json({ message: "Access forbidden" });
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



export const getSingleProduct = async (req, res) => { /* ... existing logic ... */ };