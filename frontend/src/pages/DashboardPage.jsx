// src/pages/DashboardPage.jsx

import React from 'react';
import { Grid } from '@mui/material';
import StatCard from '../components/dashboard/StatCard';
import StockChart from '../components/dashboard/StockChart';
import RecentActivity from '../components/dashboard/RecentActivity';
import { Inventory, AttachMoney, Warning, AutoGraph } from '@mui/icons-material';

const DashboardPage = () => {
  return (
    <Grid container spacing={3}>
      {/* Stat Cards */}
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Total Products" value="128" icon={<Inventory />} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Today's Sales" value="$1,200" icon={<AttachMoney />} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Low Stock Alerts" value="5" icon={<Warning />} color="#ff9800" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Predicted Demand" value="AI Forecast" icon={<AutoGraph />} />
      </Grid>

      {/* Charts and Recent Activity */}
      {/* <Grid item xs={12} lg={8}>
        <StockChart />
      </Grid> */}
      <Grid item xs={12} lg={4}>
        {/* Replace the placeholder with the actual component */}
        <RecentActivity />
      </Grid>
    </Grid>
  );
};

export default DashboardPage;