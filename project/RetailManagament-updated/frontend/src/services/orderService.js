// src/services/orderService.js
import API from "./api";

export const fetchOrders = () => {
  return API.get("/api/orders");
};

export const createNewOrder = (orderData) => {
  return API.post("/api/orders", orderData);
};

export const markOrderAsReceived = (orderId) => {
  return API.put(`/api/orders/${orderId}/receive`);
};
