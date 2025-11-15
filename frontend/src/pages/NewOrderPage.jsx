import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

import CategoryBubbles from "../components/orders/CategoryBubbles";
import ProductCard from "../components/catalog/ProductCard";
import CartOverlay from "../components/orders/CartOverlay";

import { fetchDiscoveryProducts } from "../services/productService";
import { createNewOrder } from "../services/orderService";
import { fetchAllSuppliers } from "../services/supplierService";

const NewOrderPage = () => {
  const [masterProducts, setMasterProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState("");

  const navigate = useNavigate();

  /* ============================
     LOAD DATA
  ============================= */
useEffect(() => {
  const loadData = async () => {
    try {
      setLoading(true);

      const [pRes, sRes] = await Promise.all([
        fetchDiscoveryProducts().catch(() => ({ data: [] })),
        fetchAllSuppliers().catch(() => ({ data: [] })),
      ]);

      const products = pRes?.data || [];
      const supplierList = Array.isArray(sRes) ? sRes : [];

      setMasterProducts(products);
      setSuppliers(supplierList);

      if (supplierList.length > 0) {
        setSelectedSupplierId(supplierList[0]._id);
      }
    } finally {
      setLoading(false);
    }
  };

  loadData();
  
}, []);


  /* ============================
     CART HANDLERS
  ============================= */
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((i) => i._id === product._id);
      if (exist) {
        return prev.map((i) =>
          i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  // console.log(suppliers)
  const handleQuantityChange = (id, amount) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i._id === id ? { ...i, quantity: Math.max(0, i.quantity + amount) } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const handleRemoveFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i._id !== id));

  /* ============================
     PLACE ORDER
  ============================= */
  const handlePlaceOrder = async () => {
    if (cart.length === 0) return alert("Cart is empty!");
    if (!selectedSupplierId) return alert("Select a supplier first!");

    const order = {
      supplier_id: selectedSupplierId,
      items: cart.map((i) => ({
        product_id: i._id,
        quantity: i.quantity,
        price: i.price,
      })),
    };

    try {
      setLoading(true);
      await createNewOrder(order);
      setCart([]);
      setIsCartOpen(false);
      navigate("/orders");
    } finally {
      setLoading(false);
    }
  };


  const categories = ["All", "Electronics", "Apparel", "Groceries", "Home Goods"];

  const filteredProducts = useMemo(() => {
    return masterProducts.filter(
      (p) =>
        (selectedCategory === "All" || p.category === selectedCategory)
    );
  }, [masterProducts, selectedCategory]);

  const cartCount = cart.length;
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);


  return (
    <Box sx={{ bgcolor: "#f4f8ff", minHeight: "100vh" }}>
      
      {/* Top Controls */}
      <Box sx={{ p: 2, px: 3 }}>
        <Grid container spacing={2}>
          
          {/* Categories */}
        <Grid item xs={12} sm={6} md={3} sx={{ display: "flex" }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "white",
                borderRadius: 2,
                border: "1px solid #e3e7ff",
              }}
            >
              <CategoryBubbles
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                themeColor="#1a73e8"
              />
            </Paper>
          </Grid>

          {/* Supplier Dropdown */}
          <Grid item xs={12} sm={4} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "white",
                borderRadius: 2,
                border: "1px solid #e3e7ff",
              }}
            >
              <FormControl fullWidth size="small">
                <InputLabel>Supplier</InputLabel>
                <Select
                  value={selectedSupplierId}
                  label="Supplier"
                  onChange={(e) => setSelectedSupplierId(e.target.value)}
                >
                  {suppliers.map((s) => (
                    <MenuItem key={s._id} value={s._id}>
                      {s.business_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* PRODUCT GRID */}
      <Box sx={{ px: 3, pb: 12 }}>
        <Typography
          sx={{ fontSize: "1.1rem", fontWeight: 700, mb: 2, color: "#1a237e" }}
        >
          {selectedCategory === "All"
            ? "All Products"
            : `Products in ${selectedCategory}`}
        </Typography>

        {loading ? (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const cartItem = cart.find((c) => c._id === product._id);
                return (
                  <Grid item xs={12} sm={6} md={3} key={product._id}>
                    <ProductCard
                      product={product}
                      onAdd={handleAddToCart}
                      onUpdate={handleQuantityChange}
                      cartQty={cartItem?.quantity || 0}
                      themeColor="#1a73e8"
                    />
                  </Grid>
                );
              })
            ) : (
              <Typography
                sx={{
                  width: "100%",
                  mt: 4,
                  textAlign: "center",
                  color: "text.secondary",
                }}
              >
                No products in this category.
              </Typography>
            )}
          </Grid>
        )}
      </Box>

      {/* CART BAR */}
      {cartCount > 0 && (
        <Paper
          elevation={6}
          sx={{
            position: "fixed",
            bottom: 16,
            left: 32,
            right: 32,
            zIndex: 20,
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={() => setIsCartOpen(true)}
            sx={{
              bgcolor: "#1a73e8",
              "&:hover": { bgcolor: "#135ec4" },
              py: 2,
              px: 3,
              fontWeight: 700,
            }}
          >
            <Box flexGrow={1} textAlign="left">
              <Typography>{cartCount} Items</Typography>
              <Typography variant="caption">₹{cartTotal.toFixed(2)}</Typography>
            </Box>
            <ShoppingCart />
          </Button>
        </Paper>
      )}

      {/* CART OVERLAY */}
      {isCartOpen && (
        <CartOverlay
          items={cart}
          total={cartTotal}
          onClose={() => setIsCartOpen(false)}
          onQuantityChange={handleQuantityChange}
          onRemoveItem={handleRemoveFromCart}
          onPlaceOrder={handlePlaceOrder}
        />
      )}
    </Box>
  );
};

export default NewOrderPage;
