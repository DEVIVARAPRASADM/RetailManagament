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
- Modern POS interface for fast sales entry  
- Real-time stock deductions  
- Complete sales history tracking  

### 🚚 Supplier Order Workflow
- Retailers create purchase requests for low-stock products  
- Suppliers manage order statuses: **Processing → Shipped → Delivered**  
- Inventory automatically increments upon delivery  

### 📊 Analytics Dashboard
- Top-selling product insights  
- Monthly/weekly sales trends  
- Clean charts for stock & sales performance  

### 🤖 AI-Based Demand Forecasting
- Python Prophet model analyses past sales  
- Predicts upcoming product demand  
- Offers restock recommendations to prevent shortages & overstocking  

### 🔐 Authentication & Security
- JWT-based secure login  
- Role-based access control (Retailer / Supplier)  
- Protected routes and secure API communication  

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
- Prophet (Demand Forecasting)  

---

## 📈 How It Works

### 🧑‍💼 Retailer Flow
- Add and manage products  
- Record sales using POS-like UI  
- View real-time stock updates  
- Create supplier purchase requests  
- Check sales analytics & demand forecasts  

### 🚚 Supplier Flow
- View all incoming orders  
- Update order status (Processing → Shipped → Delivered)  
- Delivered orders auto-update retailer inventory  

### 📊 Forecasting Flow
1. Historical sales fetched from MongoDB  
2. Prophet model in Python predicts demand  
3. Forecast results returned to backend  
4. Frontend displays predictions & restocking suggestions  

---

## 🧪 Testing Overview

### 🔍 Unit Testing
- Authentication and JWT  
- Inventory CRUD  
- Forecasting logic  
- Supplier workflow  

### 🔗 Integration Testing
- API + MongoDB interactions  
- Inventory-sales sync  
- Forecasting → backend → frontend flow  

### 🖥️ UI Testing
- Dashboards  
- Form validations  
- Notifications (success/error)  

### ⚠️ Error Handling
- Invalid login, weak input, missing fields  
- Stock limits, negative quantity prevention  
- API error messages & fail-safes  

---

## 📦 Future Enhancements
- Mobile app (React Native)  
- Barcode scanning for products  
- GST-enabled billing system  
- Multi-shop support  
- Push/email notifications  
- Advanced AI forecasting (LSTM, seasonality models)  

---

## 🧑‍💻 Developer

**Devivaraprasad Mullaguri**  
Full Stack Developer  
GitHub: https://github.com/DEVIVARAPRASADM  
LinkedIn: https://www.linkedin.com/in/devivaraprasad-mullaguri  

---
Thank you for exploring **Retail Connect**! ⭐  
Feel free to fork, contribute, or open issues!
