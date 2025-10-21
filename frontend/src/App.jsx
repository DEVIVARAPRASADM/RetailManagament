import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Layouts
import DashboardLayout from './layouts/DashboardLayout';

// --- Import ALL your real pages ---
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage'; // <-- 1. IMPORT THE REAL PAGE

// --- Create placeholders ONLY for pages you haven't built yet ---
const OrdersPage = () => <div style={{ padding: '1rem' }}>Orders Page Content</div>;
const AnalyticsPage = () => <div style={{ padding: '1rem' }}>Analytics Page Content</div>;

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes with DashboardLayout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* 2. USE THE REAL COMPONENT in the route */}
        <Route path="/inventory" element={<InventoryPage />} /> 
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Route>
    </Routes>
  );
}

export default App;