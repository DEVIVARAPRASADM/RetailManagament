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
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

// FLIPKART THEME 🎨
const FK_BLUE = "#2874F0";
const FK_DARK_BLUE = "#1A4FB5";
const FK_YELLOW = "#FF9F00";
const BG_WHITE = "#FFFFFF";
const BORDER_GREY = "#E0E0E0";

// -----------------------------------------------------------
// USER LIST COMPONENT — FLIPKART STYLE
// -----------------------------------------------------------
const UserList = ({ users, onVerify }) => (
  <List sx={{ mt: 2 }}>
    <AnimatePresence>
      {users.map((user) => (
        <motion.div
          key={user._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
        >
          <ListItem
            sx={{
              borderRadius: "14px",
              px: 2.5,
              py: 2,
              mb: 1.8,
              background: "#ffffff",
              border: "1px solid #E3E6EA",
              display: "flex",
              alignItems: "center",
              gap: 2.5,
              transition: "0.25s ease",
              boxShadow: "0px 2px 5px rgba(0,0,0,0.04)",
              "&:hover": {
                transform: "translateY(-4px)",
                borderColor: "#C9CDD2",
                boxShadow: "0px 8px 22px rgba(0,0,0,0.12)",
              },
            }}
            secondaryAction={
              <Button
                variant="contained"
                onClick={() => onVerify(user._id)}
                disabled={user.is_verified}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: "10px",
                  px: 3,
                  py: 0.9,
                  fontSize: 14,
                  background: user.is_verified ? "#00C853" : "#2874F0",
                  color: "#fff",
                  boxShadow: user.is_verified
                    ? "0 4px 10px rgba(0,200,83,0.35)"
                    : "0 4px 10px rgba(40,116,240,0.35)",
                  "&:hover": {
                    background: user.is_verified ? "#00B248" : "#1A4FB5",
                  },
                }}
              >
                {user.is_verified ? "Verified ✓" : "Verify"}
              </Button>
            }
          >
            {/* Avatar */}
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "#E3F2FD",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: 700,
                fontSize: 20,
                color: "#2874F0",
              }}
            >
              {user.username?.charAt(0)?.toUpperCase()}
            </Box>

            {/* Main content */}
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 17,
                  color: "#111",
                  mb: 0.3,
                }}
              >
                {user.username}
              </Typography>

              <Typography
                sx={{
                  fontSize: 13.5,
                  color: "#555",
                  opacity: 0.9,
                }}
              >
                {user.email}
              </Typography>

              {/* Role Badge */}
              <Box
                sx={{
                  width: "fit-content",
                  mt: 1,
                  px: 1.4,
                  py: 0.4,
                  borderRadius: "8px",
                  fontSize: 12.5,
                  fontWeight: 700,
                  background:
                    user.role === "Admin"
                      ? "#FFF3CD"
                      : user.role === "Supplier"
                      ? "#E3F2FD"
                      : "#FFE0B2",
                  color:
                    user.role === "Admin"
                      ? "#795548"
                      : user.role === "Supplier"
                      ? "#1A4FB5"
                      : "#E65100",
                }}
              >
                {user.role}
              </Box>
            </Box>
          </ListItem>

          {/* Divider animation */}
          <Divider sx={{ opacity: 0.3 }} />
        </motion.div>
      ))}
    </AnimatePresence>
  </List>
);


// -----------------------------------------------------------
// MAIN ADMIN DASHBOARD — FLIPKART THEME
// -----------------------------------------------------------
export default function AdminDashboard() {
  const { token, logout } = useAuth();

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [owners, setOwners] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const api = axios.create({
baseURL: `${import.meta.env.VITE_API_URL}/api`,
    headers: { Authorization: `Bearer ${token}` },
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resUsers, resOwners, resSuppliers] = await Promise.all([
        api.get("/users"),
        api.get("/users/shopowners"),
        api.get("/users/suppliers"),
      ]);

      setUsers(resUsers.data);
      setOwners(resOwners.data);
      setSuppliers(resSuppliers.data);
    } catch (error) {
      setSnack({
        open: true,
        message: "Failed to load data",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleVerifyUser = async (id) => {
    try {
      const res = await api.patch(`/users/verify/${id}`);
      setSnack({
        open: true,
        message: res.data.message,
        severity: "success",
      });
      fetchData();
    } catch {
      setSnack({
        open: true,
        message: "Verification failed",
        severity: "error",
      });
    }
  };

  return (
    <Box sx={{ background: BG_WHITE, minHeight: "100vh", py: 4 }}>
      <Container maxWidth="md">
        {/* ---------------------------------------------
            FLIPKART NAVBAR (Blue, Fixed, Clean)
        --------------------------------------------- */}
        <Paper
          elevation={3}
          sx={{
            background: FK_BLUE,
            color: "#fff",
            borderRadius: 2,
            px: 3,
            py: 1.8,
            mb: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.18)",
          }}
        >
          {/* Left */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.4 }}>
            <AdminPanelSettingsIcon sx={{ fontSize: 30 }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Admin Dashboard
            </Typography>
          </Box>

          {/* Right */}
          <Button
            onClick={logout}
            sx={{
              background: "#fff",
              color: FK_BLUE,
              fontWeight: 700,
              px: 2.5,
              borderRadius: 2,
              textTransform: "none",
              "&:hover": {
                background: "#f1f1f1",
              },
              display: "flex",
              gap: 1,
            }}
          >
            <LogoutIcon /> Logout
          </Button>
        </Paper>

        {/* ---------------------------------------------
            MAIN CONTENT CARD
        --------------------------------------------- */}
        <Paper
          elevation={4}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            border: `1px solid ${BORDER_GREY}`,
          }}
        >
          {/* Tabs */}
          <Tabs
            value={tabIndex}
            onChange={(_, n) => setTabIndex(n)}
            TabIndicatorProps={{
              style: {
                backgroundColor: FK_YELLOW,
                height: 4,
              },
            }}
            centered
            sx={{
              background: "#fff",
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 700,
                fontSize: 15,
              },
              "& .Mui-selected": {
                color: FK_BLUE,
              },
            }}
          >
            <Tab label="All Users" />
            <Tab label="Shop Owners" />
            <Tab label="Suppliers" />
          </Tabs>

          {/* Body */}
          <Box sx={{ p: 3, background: "#fafafa", minHeight: 300 }}>
            {loading ? (
              <Box sx={{ textAlign: "center", py: 10 }}>
                <CircularProgress color="primary" />
                <Typography sx={{ mt: 1, color: "#444" }}>
                  Loading data...
                </Typography>
              </Box>
            ) : (
              <AnimatePresence mode="wait">
                {tabIndex === 0 && (
                  <motion.div
                    key="tab-all"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Typography sx={{ fontWeight: 700, mb: 2 }}>
                      All Users ({users.length})
                    </Typography>
                    <UserList users={users} onVerify={handleVerifyUser} />
                  </motion.div>
                )}

                {tabIndex === 1 && (
                  <motion.div
                    key="tab-owners"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Typography sx={{ fontWeight: 700, mb: 2 }}>
                      Shop Owners ({owners.length})
                    </Typography>
                    <UserList users={owners} onVerify={handleVerifyUser} />
                  </motion.div>
                )}

                {tabIndex === 2 && (
                  <motion.div
                    key="tab-suppliers"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Typography sx={{ fontWeight: 700, mb: 2 }}>
                      Suppliers ({suppliers.length})
                    </Typography>
                    <UserList users={suppliers} onVerify={handleVerifyUser} />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </Box>
        </Paper>

        {/* Snackbar */}
        <Snackbar
          open={snack.open}
          autoHideDuration={3000}
          onClose={() => setSnack({ ...snack, open: false })}
        >
          <Alert severity={snack.severity}>{snack.message}</Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
