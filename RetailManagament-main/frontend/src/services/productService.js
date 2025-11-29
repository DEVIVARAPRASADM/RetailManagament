// src/services/productService.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/products'; 

const getAuthHeaders = (isFormData = false) => {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  if (isFormData) {
    headers['Content-Type'] = 'multipart/form-data';
  }
  return { headers };
};

// READ products - CRITICAL for CreateOrderModal
export const fetchProducts = (category = '') => {
  const url = category ? `${API_URL}?category=${category}` : API_URL;
  return axios.get(url, getAuthHeaders());
};

export const addProduct = (productData) => {
  return axios.post(API_URL, productData, getAuthHeaders(true));
};

export const editProduct = (id, productData) => {
  return axios.put(`${API_URL}/${id}`, productData, getAuthHeaders(true));
};

export const removeProduct = (id) => {
  return axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};

export const fetchDiscoveryProducts = () => {
  return axios.get(`${API_URL}/discover`, getAuthHeaders());
};
