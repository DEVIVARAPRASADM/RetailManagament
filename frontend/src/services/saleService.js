// src/services/salesService.js
import API from "./api";

export const recordSale = (cartItems) => {
  return API.post("/sales", {
    items: cartItems.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    })),
  });
};

export const getDailySales = () => {
  return API.get("/sales/daily");
};

export const getProductDemand = () => {
  return API.get("/sales/demand");
};

export const getSalesPrediction = async () => {
  const res = await API.get("/sales/predict");
  return res.data;
};
