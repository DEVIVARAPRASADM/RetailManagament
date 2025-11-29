import axios from 'axios';
import { data } from 'react-router-dom';

const API_URL = 'http://localhost:5001/api/sales';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {}; // if no token, still allow public GETs
};

export const recordSale = (cartItems) => {
  const payload = {
    items: cartItems.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    })),
  };
  return axios.post(API_URL, payload, getAuthHeaders());
};

export const getDailySales = async () => {
  return axios.get(`${API_URL}/daily`, getAuthHeaders());
};

export const getProductDemand = async () => {
  return axios.get(`${API_URL}/demand`, getAuthHeaders());
};


export const getSalesPrediction = async () => {
  const res = await axios.get(
    "http://localhost:5001/api/sales/predict",
    getAuthHeaders()
  );
  console.log("output:", res.data);
  return res.data;
};
