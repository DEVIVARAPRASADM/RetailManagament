import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const BACKEND_URL = "http://localhost:5001";

const ProductCard = ({ product, onAdd, onUpdate, cartQty }) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        height: 280, 
        width:230,
        padding:1,
        display: "flex",
        flexDirection: "column",
        transition: "0.2s ease",
        bgcolor: "#fff",
        "&:hover": {
          boxShadow: "0 4px 18px rgba(0,0,0,0.10)",
          transform: "translateY(-3px)",
        },
      }}
    >

      <Box
        sx={{
          width: "100%",
          height: 140,               
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          bgcolor: "#f8f9ff",
          borderBottom: "1px solid #edf0fb",
        }}
      >
        <Box
          component="img"
          src={
            product.image_url
              ? `${BACKEND_URL}/${product.image_url}`
              : "https://via.placeholder.com/150"
          }
          alt={product.name}
          sx={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
          }}
        />
      </Box>

      {/* CONTENT */}
      <CardContent sx={{ flexGrow: 1, px: 1.5, py: 1 }}>
        <Typography
          sx={{
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "#1a237e",
            mb: 0.3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {product.name}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#6b7280",
            mb: 0.5,
            fontSize: "0.8rem",
          }}
        >
          {product.category}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontWeight: 700,
            color: "#111",
            fontSize: "1rem",
          }}
        >
          ₹{product.price.toFixed(2)}
        </Typography>
      </CardContent>

      {/* ACTIONS */}
      <CardActions sx={{ justifyContent: "center", pb: 1.2 }}>
        {cartQty > 0 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #d0d7ff",
              borderRadius: "16px",
              px: 1.2,
              py: 0.2,
              bgcolor: "#f0f3ff",
            }}
          >
            <IconButton
              size="small"
              onClick={() => onUpdate(product._id, -1)}
              sx={{ color: "#1a73e8", p: 0.4 }}
            >
              <Remove sx={{ fontSize: 18 }} />
            </IconButton>

            <Typography
              sx={{
                mx: 0.8,
                minWidth: 18,
                textAlign: "center",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              {cartQty}
            </Typography>

            <IconButton
              size="small"
              onClick={() => onUpdate(product._id, +1)}
              sx={{ color: "#1a73e8", p: 0.4 }}
            >
              <Add sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        ) : (
          <Button
            variant="contained"
            onClick={() => onAdd(product)}
            sx={{
              bgcolor: "#1a73e8",
              textTransform: "none",
              borderRadius: "16px",
              width:100,
              px: 3,
              py: 0.4,
              fontWeight: 600,
              fontSize: "0.9rem",
              "&:hover": { bgcolor: "#155ec1" },
            }}
          >
            Add
          </Button>
        )}
      </CardActions>

    </Card>
  );
};

export default ProductCard;
