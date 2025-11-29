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
} from "@mui/material";
import { ListAlt, ExitToApp } from "@mui/icons-material";
import { fetchOrders, updateOrderStatus } from "../services/supplierService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SupplierDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await fetchOrders();
      setOrders(res.data || []);
    } catch (err) {
      setSnack({ open: true, message: "Failed to load orders", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleApprove = async (orderId) => {
    try {
      await updateOrderStatus(orderId);
      await loadOrders();
      setSnack({ open: true, message: "Order shipped!", severity: "success" });
    } catch (err) {
      setSnack({ open: true, message: "Failed to ship order", severity: "error" });
    }
  };

  const sortedOrders = useMemo(() => {
    const priority = { processing: 1, shipped: 2 };
    return [...orders].sort((a, b) => priority[a.status] - priority[b.status]);
  }, [orders]);

  return (
    <>
      {/* ---------------------- NAVBAR ----------------------- */}
      <AppBar position="static" sx={{ bgcolor: "#0066cc" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Supplier Panel
          </Typography>

          <Box>
            <Typography variant="body1" sx={{ mr: 2, display: "inline-block" }}>
              {currentUser?.name || "Supplier"}
            </Typography>
            <IconButton color="inherit" onClick={logout}>
              <ExitToApp />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ---------------------- MAIN CONTENT ----------------------- */}
      <Box p={3}>
        <Typography variant="h5" mb={3} fontWeight="600">
          Incoming Orders
        </Typography>

        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" mb={1} sx={{ fontWeight: 600 }}>
            <ListAlt /> Orders ({sortedOrders.length})
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {loading ? (
            <CircularProgress />
          ) : (
            sortedOrders.map((order) => (
              <Card
                key={order._id}
                sx={{
                  p: 1.5,
                  mb: 1.5,
                  borderRadius: 2,
                  boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
                }}
              >
                <Typography variant="subtitle1" fontWeight="600">
                  PO #{order._id.slice(-6)}
                </Typography>

                <Typography variant="body2">Buyer: {order.buyer_name}</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 1 }}>
                  Status:{" "}
                  <Chip
                    label={order.status}
                    color={order.status === "processing" ? "warning" : "success"}
                    size="small"
                  />
                </Typography>

                <Box>
                  {order.status === "processing" ? (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleApprove(order._id)}
                    >
                      Approve & Ship
                    </Button>
                  ) : (
                    <Chip label="Shipped" color="success" size="small" />
                  )}
                </Box>
              </Card>
            ))
          )}
        </Paper>

        {/* Snackbar */}
        <Snackbar
          open={snack.open}
          autoHideDuration={3000}
          onClose={() => setSnack({ ...snack, open: false })}
        >
          <Alert severity={snack.severity}>{snack.message}</Alert>
        </Snackbar>
      </Box>
    </>
  );
}
