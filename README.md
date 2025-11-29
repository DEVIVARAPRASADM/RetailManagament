# Retail Connect 🚀  
A full-stack inventory and sales management platform designed for small retailers.  
Retail Connect helps retailers track products, manage stock, record daily sales, handle supplier orders, and forecast product demand using AI-powered models.

---

## 📌 Features

### 🛒 Inventory & Product Management
- Add, update, and manage products
- Automatic stock updates after every sale
- Low-stock alerts to prevent stockouts

### 💰 POS-Style Sales Dashboard
- Modern POS-style interface to record daily sales
- Real-time stock deductions based on recorded sales
- Complete sales history & tracking

### 🚚 Supplier Order Workflow
- Retailers create purchase requests when stock is low
- Suppliers update order status (Processing → Shipped → Delivered)
- Inventory auto-updates when an order is marked delivered

### 📊 Analytics Dashboard
- View top-selling products  
- Track monthly/weekly sales trends  
- Inventory insights with clean visual charts  

### 🤖 AI-Based Demand Forecasting
- Prophet model analyses historical sales data
- Predicts future demand for each product
- Provides restock recommendations to avoid shortages or excess inventory

### 🔐 Authentication & Security
- JWT-based login system  
- Role-based access (Retailer / Supplier)  
- Protected API routes  

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- Material UI  
- Axios  
- HTML5, CSS3, JavaScript

### Backend
- Node.js  
- Express.js  
- RESTful APIs  
- JWT Authentication  

### Database
- MongoDB  

### AI/ML
- Python  
- Prophet — Demand Forecasting  

---

## 📂 Project Structure

RetailManagament/
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── utils/
│ └── public/
└── model.py # Prophet model integration
