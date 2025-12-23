// src/services/productService.js
import API from "./api";

export const fetchProducts = (category = "") => {
  return API.get(
    category ? `/products?category=${category}` : "/products"
  );
};

export const addProduct = (productData) => {
  return API.post("/products", productData);
};

export const editProduct = (id, productData) => {
  return API.put(`/products/${id}`, productData);
};

export const removeProduct = (id) => {
  return API.delete(`/products/${id}`);
};

export const fetchDiscoveryProducts = () => {
  return API.get("/products/discover");
};
