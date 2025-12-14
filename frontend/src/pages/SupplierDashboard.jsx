import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  Chip,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Modal,
  Grid,
} from "@mui/material";
import { ListAlt, ExitToApp } from "@mui/icons-material";
import { motion } from "framer-motion";
import { fetchOrders, updateOrderStatus } from "../services/supplierService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SupplierDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Load orders
  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await fetchOrders();
      setOrders(res.data || []);
    } catch (err) {
      setSnack({
        open: true,
        message: "Failed to load orders",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // Sorting logic
  const sortedOrders = useMemo(() => {
    const priority = { processing: 1, shipped: 2, delivered: 3 };
    return [...orders].sort(
      (a, b) => (priority[a.status] || 99) - (priority[b.status] || 99)
    );
  }, [orders]);

  // Status colors
  const statusColors = {
    processing: "warning",
    shipped: "info",
    delivered: "success",
  };

  const openOrderModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleApprove = async (orderId) => {
    try {
      await updateOrderStatus(orderId);
      await loadOrders();
      setSnack({
        open: true,
        message: "Order shipped!",
        severity: "success",
      });
    } catch (err) {
      setSnack({
        open: true,
        message: "Failed to ship order",
        severity: "error",
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* ============== NAVBAR (soft, clean) ============== */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "transparent",
          background:
            "linear-gradient(90deg, rgba(40,116,240,0.96), rgba(58,141,255,0.96))",
          boxShadow: "0 8px 24px rgba(15,23,42,0.35)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            py: 1.4,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Supplier Dashboard
          </Typography>

          <Box sx={{ textAlign: "right", mr: 2 }}>
            <Typography sx={{ fontWeight: 700 }}>
              {currentUser?.name || "Supplier"}
            </Typography>
            <Typography sx={{ fontSize: 13, opacity: 0.9 }}>
              {currentUser?.email || "supplier@example.com"}
            </Typography>
          </Box>

          <IconButton
            color="inherit"
            onClick={handleLogout}
            sx={{
              bgcolor: "rgba(255,255,255,0.25)",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.35)",
              },
            }}
          >
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ============== BACKGROUND + MAIN LAYOUT ============== */}
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "radial-gradient(circle at top, #e0f2ff 0, #f5f7fb 40%, #eef1f7 100%)",
          p: 3,
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mb: 3, color: "#111827" }}
          >
            Incoming Orders
          </Typography>

          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid rgba(148,163,184,0.35)",
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(18px)",
              boxShadow: "0 18px 45px rgba(15,23,42,0.18)",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "#111827",
              }}
            >
              <ListAlt fontSize="small" /> Orders ({sortedOrders.length})
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {loading ? (
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Grid container spacing={3} alignItems="stretch">
                {sortedOrders.map((order, index) => (
                  <Grid item xs={12} sm={6} md={4} key={order._id}>
                    <Card
                      component={motion.div}
                      initial={{ opacity: 0, y: 20, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.25, delay: index * 0.04 }}
                      whileHover={{ y: -8, scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      sx={{
                        height: "100%",
                        p: 3,
                        borderRadius: 3,
                        border: "1px solid rgba(148,163,184,0.35)",
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.85))",
                        boxShadow: "0 14px 30px rgba(15,23,42,0.12)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        {/* Title / Buyer */}
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 700, mb: 1.2, color: "#111827" }}
                        >
                          {order.user_id?.business_name || "Buyer"}
                        </Typography>

                        {/* Status */}
                        <Chip
                          label={order.status}
                          color={statusColors[order.status]}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            textTransform: "capitalize",
                            borderRadius: 999,
                            px: 1.2,
                            mb: 2,
                          }}
                        />

                        {/* Order Meta */}
                        <Typography sx={{ fontSize: 14.5, color: "#4b5563" }}>
                          Items: {order.items.length}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 14.5,
                            color: "#4b5563",
                            mb: 2,
                          }}
                        >
                          Total: ₹{order.total_price}
                        </Typography>
                      </Box>

                      {/* Actions */}
                      <Box>
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            mb: order.status === "processing" ? 1 : 0,
                            borderRadius: 999,
                            textTransform: "none",
                            fontWeight: 700,
                            py: 0.8,
                            background:
                              "linear-gradient(135deg,#2563eb,#1d4ed8)",
                            boxShadow:
                              "0 10px 22px rgba(37,99,235,0.45)",
                            "&:hover": {
                              background:
                                "linear-gradient(135deg,#1d4ed8,#1e40af)",
                            },
                          }}
                          onClick={() => openOrderModal(order)}
                        >
                          View Details
                        </Button>

                        {order.status === "processing" && (
                          <Button
                            variant="contained"
                            color="success"
                            fullWidth
                            sx={{
                              borderRadius: 999,
                              textTransform: "none",
                              fontWeight: 700,
                              py: 0.8,
                            }}
                            onClick={() => handleApprove(order._id)}
                          >
                            Ship Order
                          </Button>
                        )}
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        </Box>
      </Box>

      {/* ============== MODAL (glass-style) ============== */}
      <Modal open={modalOpen} onClose={closeModal}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.25 }}
          sx={{
            width: { xs: "90%", sm: "70%", md: "50%" },
            bgcolor: "rgba(255,255,255,0.98)",
            p: 4,
            mx: "auto",
            mt: "10vh",
            borderRadius: 4,
            boxShadow: "0 25px 60px rgba(15,23,42,0.4)",
          }}
        >
          {selectedOrder && (
            <>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Order Details
              </Typography>

              <Typography sx={{ mt: 1.2 }}>
                Buyer:{" "}
                <b>{selectedOrder.user_id?.business_name || "Buyer"}</b>
              </Typography>

              <Chip
                label={selectedOrder.status}
                color={statusColors[selectedOrder.status]}
                size="small"
                sx={{ mt: 1.2, fontWeight: 700 }}
              />

              <Divider sx={{ my: 2 }} />

              <Typography sx={{ fontWeight: 700, mb: 1 }}>
                Items:
              </Typography>

              {selectedOrder.items.map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    p: 2,
                    mb: 1.5,
                    borderRadius: 3,
                    bgcolor: "#f3f4f6",
                  }}
                >
                  <Typography>Qty: {item.quantity}</Typography>
                  <Typography>Price: ₹{item.price}</Typography>
                  <Typography>
                    Subtotal: ₹{item.quantity * item.price}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Total: ₹{selectedOrder.total_price}
              </Typography>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  p: 1.1,
                  borderRadius: 999,
                  textTransform: "none",
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg,#2563eb,#1d4ed8)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg,#1d4ed8,#1e40af)",
                  },
                }}
                onClick={closeModal}
              >
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.severity}>{snack.message}</Alert>
      </Snackbar>
    </>
  );
}
