// src/services/productService.js
import API from "./api";

export const fetchProducts = (category = "") => {
  return API.get(
    category ? `/api/products?category=${category}` : "/api/products"
  );
};

export const addProduct = (productData) => {
  return API.post("/api/products", productData);
};

export const editProduct = (id, productData) => {
  return API.put(`/api/products/${id}`, productData);
};

export const removeProduct = (id) => {
  return API.delete(`/api/products/${id}`);
};

export const fetchDiscoveryProducts = () => {
  return API.get("/api/products/discover");
};
