// src/services/supplierService.js
import axios from 'axios';

const SERVER_BASE_URL = 'http://localhost:5001';
const ORDERS_API_PREFIX = '/api/supplier/orders';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

const API = axios.create({ baseURL: SERVER_BASE_URL });

// 1. Fetch all suppliers
// const MOCK_SUPPLIERS = [
//   { _id: "sup001", business_name: "Tata Consumer Wholesale" },
//   { _id: "sup002", business_name: "Reliance Smart Wholesale" },
//   { _id: "sup003", business_name: "Aditya Birla Retail Distributors" },
//   { _id: "sup004", business_name: "Godrej Everyday Essentials" },
//   { _id: "sup005", business_name: "ITC Agro & FMCG Suppliers" },

// ];

// 1. Fetch all suppliers
export const fetchAllSuppliers = async () => {
  try {
    console.log("here")
    const response = await API.get('/api/suppliers/', getAuthHeaders());
    console.log("Raw Supplier Response:", response.data);

    // Normalize supplier array
    const suppliers = response.data?.data || response.data || [];

    // Ensure result is an array
    if (Array.isArray(suppliers)) {
      return suppliers.length > 0 ? suppliers : MOCK_SUPPLIERS;
    }

    // If wrong format, return mocks
    // return MOCK_SUPPLIERS;

  } catch (error) {
    console.error("Axios Error fetching suppliers:", error.message);

    // return MOCK_SUPPLIERS;
  }
};


// 2. Fetch orders for logged-in supplier
export const fetchOrders = async () => {
  try {
    const response = await API.get('/api/suppliers/orders', getAuthHeaders());
    console.log("data", response.data);
    return { data: response.data };
  } catch (error) {
    console.error("Axios Error fetching supplier orders:", error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch supplier orders.");
  }
};

// 3. Ship order
export const updateOrderStatus = async (orderId) => {
  try {
    console.log("Calling:", `/api/suppliers/${orderId}/ship`);

    const res = await API.put(
      `/api/suppliers/${orderId}/ship`,
      {},
      getAuthHeaders()
    );

    return res.data;
  } catch (error) {
    console.error("Ship ERROR:", error);
    console.error("Response:", error.response?.data);
    throw new Error(error.response?.data?.message || "Failed to ship order");
  }
};

