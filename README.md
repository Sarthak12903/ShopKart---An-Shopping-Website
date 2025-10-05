# 🛒 Simple Shopping Cart - Full Stack Application

A modern, full-stack shopping cart application built with **React**, **Node.js**, **Express**, and **SQLite**.

---

## 🚀 Features

- 🧭 Browse products with details (name, price, stock, category)
- ➕ Add products to cart
- 🔁 Update product quantities in cart
- ❌ Remove items from cart
- ⚡ Real-time cart total calculation
- 📦 Stock management
- 📱 Responsive design with TailwindCSS
- 🌐 RESTful API architecture
- 💾 SQLite database for persistence

---

## 🛠️ Tech Stack

### 🖥️ Frontend

- React 18
- TailwindCSS
- Axios
- Modern ES6+ JavaScript

### ⚙️ Backend

- Node.js
- Express.js
- Better-SQLite3
- RESTful API design

---

## 📁 Project Structure

shopping-cart/
├── backend/ # Node.js + Express API
│ ├── src/
│ │ ├── config/ # Database configuration
│ │ ├── controllers/ # Request handlers
│ │ ├── models/ # Database models
│ │ ├── routes/ # API routes
│ │ └── middleware/ # Error handling
│ ├── tests/ # Jest tests
│ ├── package.json
│ └── server.js
│
├── frontend/ # React application
│ ├── src/
│ │ ├── components/ # React components
│ │ │ ├── auth/
│ │ │ ├── cart/
│ │ │ ├── products/
│ │ │ ├── layout/
│ │ │ └── common/
│ │ ├── context/ # React Context
│ │ ├── services/ # API services
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── package.json
│ ├── vite.config.js
│ └── index.html
│
└── README.md

---

## ⚙️ Setup Instructions

### 🧩 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

---

### 🔽 Clone the Repository

```bash
git clone <your-repo-url>
cd shopping-cart
```

### 🛠️ Backend Setup

1. Navigate to backend directory:
   cd backend

2. Install dependencies:
   npm install

3. Create .env file:
   PORT=5000
   NODE_ENV=development
   DB_PATH=./shopping_cart.db

4. Start the development server:
   npm run dev

### 💻 Frontend Setup

1. Navigate to frontend directory:
   cd ../frontend

2. Install dependencies:
   npm install

3. Create .env file:
   VITE_API_URL=http://localhost:5100/api

4. Start the frontend app:
   npm run dev
