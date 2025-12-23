// src/services/dashboardService.js
import API from "./api";

export const fetchDashboardStats = () => {
  return API.get("/dashboard/stats");
};
