import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import {
  Storefront,
  Fastfood,
  LocalPharmacy,
  LocalGroceryStore,
} from "@mui/icons-material";

const iconMap = {
  FMCG: <Storefront sx={{ fontSize: 28 }} />,
  Grocery: <LocalGroceryStore sx={{ fontSize: 28 }} />,
  Fresh: <Fastfood sx={{ fontSize: 28 }} />,
  Pharma: <LocalPharmacy sx={{ fontSize: 28 }} />,
};

const CategoryBubbles = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        gap: 2,
        px: 1,
      }}
    >
      {categories.map((cat) => (
        <Paper
          key={cat}
          onClick={() => onSelectCategory(cat)}
          elevation={selectedCategory === cat ? 4 : 0}
          sx={{
            flex: "0 0 auto",
            cursor: "pointer",
            px: 3,
            py: 2,
            borderRadius: "16px",
            textAlign: "center",
            border:
              selectedCategory === cat
                ? "2px solid #e53935"
                : "1px solid #e0e0e0",
            bgcolor: selectedCategory === cat ? "#ffebee" : "#fff",
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            },
          }}
        >
          <Box
            sx={{
              color: selectedCategory === cat ? "#e53935" : "#555",
              mb: 0.5,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {iconMap[cat] || <Storefront sx={{ fontSize: 28 }} />}
          </Box>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: selectedCategory === cat ? "#e53935" : "#333",
            }}
          >
            {cat}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default CategoryBubbles;
