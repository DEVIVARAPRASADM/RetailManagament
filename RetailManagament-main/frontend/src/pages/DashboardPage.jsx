// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { Inventory, AttachMoney, Warning, AutoGraph } from "@mui/icons-material";

import StatCard from "../components/dashboard/StatCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import SalesAnalysisChart from "../components/dashboard/SalesAnalysisChart";
import DemandPredictionChart from "../components/dashboard/DemandPredictionChart";
import { fetchDashboardStats } from "../services/dashboardService";

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    todaysSales: 0,
    lowStockCount: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        const response = await fetchDashboardStats();
        const { totalProducts, todaysSales, lowStockCount, recentActivity } =
          response.data;
        setStats({ totalProducts, todaysSales, lowStockCount });
        setRecentActivity(recentActivity);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {/* ======================= STAT CARDS (ROW 1) ======================= */}
      <Grid container spacing={3}>
        {[
          {
            title: "Total Products",
            value: loading ? "..." : stats.totalProducts,
            icon: <Inventory />,
          },
          {
            title: "Today's Sales",
            value: loading ? "..." : `$${stats.todaysSales.toFixed(2)}`,
            icon: <AttachMoney />,
          },
          {
            title: "Low Stock Alerts",
            value: loading ? "..." : stats.lowStockCount,
            icon: <Warning />,
            color: "#ff9800",
          },
          {
            title: "Predicted Demand",
            value: "AI Forecast",
            icon: <AutoGraph />,
            color: "#4caf50",
          },
        ].map((card, idx) => (
          <Grid key={idx} item xs={12} sm={6} md={3}>
            <Box sx={{ width: "100%" }}>
              <StatCard {...card} />
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* ======================= MAIN DASHBOARD (ROW 2) ======================= */}
      <Grid container spacing={3} alignItems="stretch">
        {/* 📊 Sales Forecast */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 3,
              bgcolor: "#fff",
              borderRadius: 3,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              height: "100%",
              minHeight: 400,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <SalesAnalysisChart />
          </Box>
        </Grid>

        {/* 🧾 Recent Activity */}
         <Grid item xs={12} md={4}>
          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: 3,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              height: "100%",
              minHeight: 400,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 2,
            }}
          >
             <RecentActivity activities={recentActivity} loading={loading} /> 
          </Box>
        </Grid> 

        {/* 🤖 Product Demand Forecast */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 3,
              bgcolor: "#fff",
              borderRadius: 3,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              height: "100%",
              minHeight: 400,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <DemandPredictionChart />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
