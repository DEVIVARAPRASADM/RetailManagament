import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Box,
  CircularProgress,
  Button,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

// Flipkart-inspired colors
const FLIPKART_BLUE = "#2874F0";
const FLIPKART_DARK_BLUE = "#1C4FA0";
const FLIPKART_YELLOW = "#FF9F00";
const BG_GREY = "#F1F3F6";

// Reusable component to display a list of users
const UserList = ({ users, onVerify }) => (
  <List sx={{ mt: 1 }}>
    <AnimatePresence>
      {users.map((user, index) => (
        <React.Fragment key={user._id}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, delay: index * 0.03 }}
          >
            <ListItem
              sx={{
                borderRadius: 1,
                mb: 0.5,
                px: 2,
                "&:hover": {
                  backgroundColor: "rgba(40, 116, 240, 0.04)",
                  transform: "translateY(-1px)",
                  transition: "all 0.2s ease",
                },
              }}
              secondaryAction={
                <Button
                  variant={user.is_verified ? "outlined" : "contained"}
                  size="small"
                  onClick={() => onVerify(user._id)}
                  disabled={user.is_verified}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 999,
                    px: 2.5,
                    boxShadow: user.is_verified ? "none" : "0 3px 6px rgba(0,0,0,0.18)",
                    backgroundColor: user.is_verified ? "#fff" : FLIPKART_BLUE,
                    borderColor: user.is_verified ? FLIPKART_BLUE : "transparent",
                    color: user.is_verified ? FLIPKART_BLUE : "#fff",
                    "&:hover": {
                      backgroundColor: user.is_verified ? "#f5f5f5" : FLIPKART_DARK_BLUE,
                      boxShadow: "0 4px 10px rgba(0,0,0,0.22)",
                    },
                  }}
                >
                  {user.is_verified ? "Verified" : "Verify"}
                </Button>
              }
            >
              <ListItemText
                primaryTypographyProps={{
                  fontWeight: 600,
                  color: "#212121",
                }}
                secondaryTypographyProps={{
                  fontSize: 13,
                  color: "#555",
                }}
                primary={user.username}
                secondary={`Email: ${user.email} | Role: ${user.role}`}
              />
            </ListItem>
          </motion.div>
          <Divider />
        </React.Fragment>
      ))}
    </AnimatePresence>
  </List>
);

const AdminDashboard = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [shopOwners, setShopOwners] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const api = axios.create({
    baseURL: "http://localhost:5001/api",
    headers: { Authorization: `Bearer ${token}` },
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, ownersRes, suppliersRes] = await Promise.all([
        api.get("/users"),
        api.get("/users/shopowners"),
        api.get("/users/suppliers"),
      ]);
      setUsers(usersRes.data);
      setShopOwners(ownersRes.data);
      setSuppliers(suppliersRes.data);
    } catch (error) {
      setSnack({
        open: true,
        message: "Failed to fetch data",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleVerifyUser = async (userId) => {
    try {
      const res = await api.patch(`/users/verify/${userId}`);
      setSnack({
        open: true,
        message: res.data.message,
        severity: "success",
      });
      fetchData(); // Refresh data after verification
    } catch (error) {
      setSnack({
        open: true,
        message: "Failed to verify user",
        severity: "error",
      });
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // Variants for card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${FLIPKART_BLUE} 0, ${FLIPKART_BLUE} 120px, ${BG_GREY} 120px)`,
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Box sx={{ mb: 3, color: "#fff" }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 700,
                letterSpacing: 0.3,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              Admin Dashboard
              <Box
                sx={{
                  fontSize: 14,
                  backgroundColor: FLIPKART_YELLOW,
                  px: 1.5,
                  py: 0.3,
                  borderRadius: 999,
                  color: "#111",
                  fontWeight: 600,
                }}
              >
                Super Admin
              </Box>
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Manage and verify users, shop owners and suppliers of your platform.
            </Typography>
          </Box>
        </motion.div>

        <motion.div variants={cardVariants} initial="hidden" animate="visible">
          <Paper
            elevation={4}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
              backgroundColor: "#fff",
            }}
          >
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              centered
              TabIndicatorProps={{
                style: { backgroundColor: FLIPKART_YELLOW, height: 3 },
              }}
              sx={{
                backgroundColor: "#fff",
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 600,
                  minHeight: 52,
                  fontSize: 14,
                },
                "& .MuiTab-root.Mui-selected": {
                  color: FLIPKART_BLUE,
                },
              }}
            >
              <Tab label="All Users" />
              <Tab label="Shop Owners" />
              <Tab label="Suppliers" />
            </Tabs>

            <Box
              sx={{
                p: 3,
                backgroundColor: BG_GREY,
                minHeight: 280,
              }}
            >
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 220,
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <CircularProgress />
                  <Typography variant="body2" sx={{ mt: 1, color: "#555" }}>
                    Fetching latest user data...
                  </Typography>
                </Box>
              ) : (
                <AnimatePresence mode="wait">
                  {tabIndex === 0 && (
                    <motion.div
                      key="all-users"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ mb: 1.5, fontWeight: 600, color: "#333" }}
                      >
                        All Users ({users.length})
                      </Typography>
                      <UserList users={users} onVerify={handleVerifyUser} />
                    </motion.div>
                  )}

                  {tabIndex === 1 && (
                    <motion.div
                      key="shop-owners"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ mb: 1.5, fontWeight: 600, color: "#333" }}
                      >
                        Shop Owners ({shopOwners.length})
                      </Typography>
                      <UserList users={shopOwners} onVerify={handleVerifyUser} />
                    </motion.div>
                  )}

                  {tabIndex === 2 && (
                    <motion.div
                      key="suppliers"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ mb: 1.5, fontWeight: 600, color: "#333" }}
                      >
                        Suppliers ({suppliers.length})
                      </Typography>
                      <UserList users={suppliers} onVerify={handleVerifyUser} />
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </Box>
          </Paper>
        </motion.div>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snack.open}
          autoHideDuration={4000}
          onClose={() => setSnack({ ...snack, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity={snack.severity} sx={{ width: "100%" }}>
            {snack.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
