# 🛒 Smart Inventory & Demand Prediction System (MERN)

A **full-stack MERN application** designed to help **small retail businesses** digitize inventory management, streamline supplier ordering, and make **data-driven restocking decisions** using **AI-based demand forecasting**.

This project replaces manual inventory tracking and spreadsheets with a **centralized, role-based system** that provides real-time stock visibility, analytics, and predictive insights.

---

## 📌 Problem Statement

Small retail shop owners often struggle with:

* Manual inventory tracking
* Stock mismatches and overstocking
* Delayed restocking
* No visibility into sales trends
* Lack of forecasting or analytics

As businesses grow, Excel sheets and notebooks become error-prone and inefficient. This leads to **wasted stock, missed sales, and operational stress**.

---

## 💡 Solution Overview

This system provides:

* A **POS-style dashboard** for inventory, sales, and orders
* **Role-based workflows** for shop owners and suppliers
* **Analytics dashboards** for top-selling and low-stock items
* **AI-powered demand forecasting** using time-series models
* **Low-stock alerts and purchase recommendations**

The platform helps retailers **optimize stock levels, reduce waste, and save time** through automation and predictive analytics.

---

## 👥 Actors Involved

* **Shop Owner**
  Manages inventory, sales, analytics, and purchase requests

* **Supplier**
  Receives and processes purchase orders

* **System (AI/ML)**
  Forecasts demand, sends low-stock alerts, and suggests optimal restocking

---

## 🧩 Key Features

### 🔹 Inventory Management

* Add, update, and track products
* Real-time stock quantity updates

### 🔹 Sales Tracking

* Records daily sales
* Aggregates sales data for analytics

### 🔹 Analytics Dashboard

* Top-selling products
* Low-stock indicators
* Sales trends over time

### 🔹 AI Demand Forecasting

* Time-series forecasting using **Prophet / LSTM**
* Predicts future product demand
* Helps avoid understocking and overstocking

### 🔹 Alerts & Recommendations

* Automatic low-stock alerts
* Supplier order suggestions based on forecast

---

## 🛠️ Tech Stack

**Frontend**

* React.js
* Component-based UI
* Responsive dashboard

**Backend**

* Node.js
* Express.js
* RESTful APIs
* MVC architecture

**Database**

* MongoDB (Products, Sales, Inventory)

**Machine Learning**

* Prophet / LSTM for demand forecasting

---

## 🚀 Live Deployment

**Frontend (Vercel)**
[https://retail-managament.vercel.app](https://retail-managament.vercel.app)

**Backend API (Render)**
[https://retail-management-backend-r9sr.onrender.com](https://retail-management-backend-r9sr.onrender.com)

---

## 📂 Project Structure

```
smart-inventory-system/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── services/
│   └── server.js
│
├── ml/
│   └── demand_forecasting.py
│
└── README.md
```

---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/smart-inventory-system.git
cd smart-inventory-system
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm start
```

Create `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🧠 AI Forecasting Workflow

1. Fetch historical sales data from MongoDB
2. Preprocess and aggregate daily sales
3. Train time-series model (Prophet / LSTM)
4. Generate future demand predictions
5. Display forecasts on dashboard

---

## 🧪 Deployment Notes

* MongoDB Atlas used for cloud database
* CORS properly configured
* Environment variables set on Render
* APIs tested using Postman
* ML scripts handled separately to avoid server overload

---

## 📈 Future Enhancements

* JWT-based authentication
* Automated supplier notifications
* Multi-store support
* AI-based pricing optimization

---

## 🎯 Conclusion

This project demonstrates how **MERN stack development combined with AI forecasting** can solve real-world retail problems. It showcases full-stack engineering, backend architecture, deployment, and applied machine learning in a production-oriented system.
