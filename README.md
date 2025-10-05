# 🛒 Simple Shopping Cart - Full Stack Application

A modern, full-stack shopping cart application built with React, Node.js, Express, and SQLite.

## 🚀 Features

- Browse products with details (name, price, stock, category)
- Add products to cart
- Update product quantities in cart
- Remove items from cart
- Real-time cart total calculation
- Stock management
- Responsive design with TailwindCSS
- RESTful API architecture
- SQLite database for persistence

## 🛠️ Tech Stack

### Frontend

- React 18
- TailwindCSS
- Axios
- Modern ES6+ JavaScript

### Backend

- Node.js
- Express.js
- Better-SQLite3
- RESTful API design

## 📁 Project Structure

shopping-cart/
├── backend/ # Node.js + Express API
│ ├── src/
│ │ ├── config/ # Database configuration
│ │ ├── controllers/ # Request handlers
│ │ ├── models/ # Database models
│ │ ├── routes/ # API routes
│ │ └── middleware/ # Error handling
│ └── tests/ # Jest tests
├── frontend/ # React application
│ └── src/
│ ├── components/ # React components
│ └── services/ # API services
└── README.md

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Clone the Repository

`````git clone <your-repo-url>
cd ShopKart```


### Backend Setup

1. Navigate to backend directory:

````bash
cd backend

2. Install dependencies:
```npm install
`````

3. Create .env file:

```PORT=5000
NODE_ENV=development
DB_PATH=./shopping_cart.db
```

4. Start the server:

```npm run dev

```

### Frontend Setup

```cd ../frontend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
VITE_API_URL=http://localhost:5100/api
EOF
```

### frontend/.env

```
VITE_API_URL=http://localhost:5100/api

```
