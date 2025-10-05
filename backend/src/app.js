const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const errorHandler = require("./middleware/errorHandler");
const { initDatabase } = require("./config/database");

const app = express();

// Initialize database
initDatabase();

// CORS Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Shopping Cart API", version: "2.0.0" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;
