import React, { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Alert,
} from "@mui/material";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import axios from "axios";

const API_URL = "http://localhost:5001/api/sales/demand";

const DemandPredictionChart = () => {
  const [chartData, setChartData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  /* ===========================================
     1️⃣ Fetch & Normalize Demand Data
  ============================================ */
  useEffect(() => {
    const loadDemandData = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("Authentication token missing.");
          return;
        }

        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const rawData = response.data || [];

        // -- Collect all product keys --
        const allProducts = new Set();
        rawData.forEach((entry) => {
          Object.keys(entry)
            .filter((key) => key !== "date")
            .forEach((key) => allProducts.add(key));
        });

        // -- Normalize rows: ensure each product exists --
        const normalized = rawData.map((row) => {
          const newRow = { ...row };
          allProducts.forEach((p) => {
            if (newRow[p] === undefined) newRow[p] = 0;
          });
          return newRow;
        });

        setChartData(normalized);

        // Auto-select the product with highest total demand
        if (normalized.length > 0) {
          let bestProduct = "";
          let highestSum = -1;

          [...allProducts].forEach((product) => {
            const total = normalized.reduce((acc, row) => acc + row[product], 0);
            if (total > highestSum) {
              bestProduct = product;
              highestSum = total;
            }
          });

          setSelectedProduct(bestProduct);
        }
      } catch (err) {
        console.error("❌ Demand data fetch error:", err);
        setErrorMessage("Failed to fetch demand data.");
      } finally {
        setLoading(false);
      }
    };

    loadDemandData();
  }, []);

  /* ===========================================
     2️⃣ Extract product names
  ============================================ */
  const productNames = useMemo(() => {
    if (chartData.length === 0) return [];
    return Object.keys(chartData[0]).filter((k) => k !== "date");
  }, [chartData]);

  /* ===========================================
     3️⃣ UI
  ============================================ */
  return (
    <Card
      sx={{
        width: "100%",
        minHeight: 420,
        borderRadius: 3,
        boxShadow: 4,
        backgroundColor: "#f8f9ff",
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ pb: 0 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: "#1e1e2f",
            letterSpacing: "0.5px",
          }}
        >
          📈 AI-Powered Product Demand Forecast
        </Typography>

        {/* Error UI */}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        {/* Loading */}
        {loading ? (
          <Box
            sx={{
              height: 260,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : chartData.length === 0 ? (
          <Typography
            sx={{
              color: "text.secondary",
              textAlign: "center",
              mt: 8,
              fontSize: "1.1rem",
            }}
          >
            No demand data available.
          </Typography>
        ) : (
          <>
            {/* Product Dropdown */}
            <FormControl fullWidth size="small" sx={{ mb: 2, maxWidth: 260 }}>
              <InputLabel>Select Product</InputLabel>
              <Select
                label="Select Product"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                {productNames.map((product) => (
                  <MenuItem key={product} value={product}>
                    {product}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 25, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="4 4" stroke="#d7d9e4" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  stroke="#7e7e8c"
                />
                <YAxis stroke="#7e7e8c" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: 8,
                    border: "1px solid #e0e0e0",
                  }}
                />
                {selectedProduct && (
                  <Line
                    type="monotone"
                    dataKey={selectedProduct}
                    stroke="#4f46e5"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DemandPredictionChart;
