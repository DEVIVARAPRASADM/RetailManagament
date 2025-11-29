import axios from 'axios';

const API_URL = 'http://localhost:5001/api/dashboard';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const fetchDashboardStats = () => {
  return axios.get(`${API_URL}/stats`, getAuthHeaders());
};