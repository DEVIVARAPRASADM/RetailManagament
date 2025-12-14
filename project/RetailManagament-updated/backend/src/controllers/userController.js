import User from "../models/User.js";

/**
 * @desc    Get all users with the role 'Shop Owner'
 * @route   GET /api/users/shopowners
 * @access  Private/Admin
 */
export const getShopOwners = async (req, res) => {
  try {
    const shopOwners = await User.find({ role: "Shop Owner" }).select("-password");
    res.status(200).json(shopOwners);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * @desc    Get all users with the role 'Supplier'
 * @route   GET /api/users/suppliers
 * @access  Private/Admin
 */
export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await User.find({ role: "Supplier" }).select("-password");
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * @desc    Verify a user by setting is_verified to true
 * @route   PATCH /api/users/verify/:id
 * @access  Private/Admin
 */
export const verifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Set user as verified and save
    user.is_verified = true;
    const updatedUser = await user.save();

    res.status(200).json({
      message: `User ${updatedUser.username} has been successfully verified.`,
      user: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        is_verified: updatedUser.is_verified,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};