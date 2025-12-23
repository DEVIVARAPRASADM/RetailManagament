// src/services/orderService.js
import API from "./api";

export const fetchOrders = () => {
  return API.get("/orders");
};

export const createNewOrder = (orderData) => {
  return API.post("/orders", orderData);
};

export const markOrderAsReceived = (orderId) => {
  return API.put(`/orders/${orderId}/receive`);
};
