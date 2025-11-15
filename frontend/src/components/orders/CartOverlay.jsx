import React from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Close, Delete, Add, Remove } from "@mui/icons-material";

const BACKEND_URL = "http://localhost:5001";

const CartOverlay = ({
  items,
  total,
  onClose,
  onQuantityChange,
  onRemoveItem,
  onPlaceOrder,
}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: "rgba(0,0,0,0.4)",
        zIndex: 1000,
        backdropFilter: "blur(2px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
      }}
      onClick={onClose}
    >
      <Paper
        sx={{
          width: "600px",
          maxWidth: "95%",
          maxHeight: "80vh",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          overflow: "hidden",
          animation: "slideUp 0.3s ease-out",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#e53935",
            color: "#fff",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Your Purchase Order
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "#fff" }}>
            <Close />
          </IconButton>
        </Box>

        {/* Cart Items */}
        <List sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
          {items.length === 0 && (
            <ListItem>
              <ListItemText
                primary="Your cart is empty."
                sx={{
                  textAlign: "center",
                  fontStyle: "italic",
                  color: "text.secondary",
                }}
              />
            </ListItem>
          )}
          {items.map((item) => (
            <React.Fragment key={item._id}>
              <ListItem
                sx={{
                  alignItems: "center",
                  display: "flex",
                  gap: 2,
                  py: 1,
                }}
              >
                <img
                  src={
                    item.image_url
                      ? `${BACKEND_URL}/${item.image_url}`
                      : `https://via.placeholder.com/60`
                  }
                  alt={item.name}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 600, color: "#333" }}
                    >
                      {item.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      ₹{item.price.toFixed(2)}
                    </Typography>
                  }
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #e0e0e0",
                    borderRadius: "20px",
                    px: 1,
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => onQuantityChange(item._id, -1)}
                    disabled={item.quantity <= 1}
                  >
                    <Remove fontSize="small" />
                  </IconButton>
                  <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => onQuantityChange(item._id, 1)}
                  >
                    <Add fontSize="small" />
                  </IconButton>
                </Box>
                <IconButton onClick={() => onRemoveItem(item._id)}>
                  <Delete color="error" />
                </IconButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>

        {/* Footer */}
        <Box sx={{ p: 3, bgcolor: "#fff", borderTop: "1px solid #eee" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
              fontWeight: "bold",
            }}
          >
            <Typography>Total:</Typography>
            <Typography>₹{total.toFixed(2)}</Typography>
          </Box>
          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#e53935",
              "&:hover": { bgcolor: "#d32f2f" },
              py: 1.5,
              fontWeight: "bold",
            }}
            onClick={onPlaceOrder}
            disabled={items.length === 0}
          >
            Place Order
          </Button>
        </Box>

        <style>{`
          @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        `}</style>
      </Paper>
    </Box>
  );
};

export default CartOverlay;
