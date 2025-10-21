// src/services/productService.js

import axios from 'axios';

const API_URL = 'http://localhost:5001/api/products'; // Make sure this matches your backend port

// Helper to get the auth token from localStorage
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

// READ products
export const fetchProducts = (category = '') => {
  const url = category ? `${API_URL}?category=${category}` : API_URL;
  return axios.get(url, getAuthHeaders());
};

// CREATE a product (using FormData for the image)
export const addProduct = (productData) => {
  // productData should be a FormData object
  return axios.post(API_URL, productData, getAuthHeaders(true));
};

// UPDATE a product (using FormData for the image)
export const editProduct = (id, productData) => {
  // productData should be a FormData object
  return axios.put(`${API_URL}/${id}`, productData, getAuthHeaders(true));
};

// DELETE a product
export const removeProduct = (id) => {
  return axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};