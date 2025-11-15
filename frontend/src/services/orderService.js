import axios from 'axios';

const API_URL = 'http://localhost:5001/api/orders';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

// --- SHOP OWNER FUNCTIONS ---

// Fetches the logged-in user's order history
export const fetchOrders = () => {
  return axios.get(API_URL, getAuthHeaders());
};

// Creates a new purchase order
export const createNewOrder = (orderData) => {
  // orderData should be { supplier_id, items: [{ product_id, quantity, price }] }
  return axios.post(API_URL, orderData, getAuthHeaders());
};

// Marks an order as received, which updates inventory on the backend
export const markOrderAsReceived = (orderId) => {
  return axios.put(`${API_URL}/${orderId}/receive`, {}, getAuthHeaders());
};

