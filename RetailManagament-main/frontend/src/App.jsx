import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Import ALL your real pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import SalesPage from './pages/SalesPage'; 
import OrdersPage from './pages/OrdersPage';
import NewOrderPage from './pages/NewOrderPage';
import SupplierDashboard from './pages/SupplierDashboard';
import AdminDashboard from "./pages/AdminDashboard";

// Import your protected route components
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
 
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/supplier/orders" element={<SupplierDashboard />} />
          {/* Protected Routes with DashboardLayout */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/inventory" element={<InventoryPage />} /> 
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/sales" element={<SalesPage />} />        
            <Route path="/new-order" element={<NewOrderPage />} />

          </Route>
       
          {/* Admin-Only Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
      </Routes>

  );
}

export default App;