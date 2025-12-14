// src/services/supplierService.js
import API from "./api";

export const fetchAllSuppliers = async () => {
  const res = await API.get("/api/suppliers/");
  return res.data?.data || res.data || [];
};

export const fetchOrders = async () => {
  const res = await API.get("/api/suppliers/orders");
  return res.data;
};

export const updateOrderStatus = async (orderId) => {
  const res = await API.put(`/api/suppliers/${orderId}/ship`);
  return res.data;
};
