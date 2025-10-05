const Database = require("better-sqlite3");
const path = require("path");

const dbPath =
  process.env.DB_PATH || path.join(__dirname, "../../shopping_cart.db");
const db = new Database(dbPath);

// Enable foreign keys
db.pragma("foreign_keys = ON");

const initDatabase = () => {
  // Create users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create products table
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      category TEXT,
      stock INTEGER NOT NULL DEFAULT 0,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create cart table with user_id
  db.exec(`
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
    )
  `);

  // Insert sample products if table is empty
  const count = db.prepare("SELECT COUNT(*) as count FROM products").get();
  if (count.count === 0) {
    const insert = db.prepare(`
      INSERT INTO products (name, description, price, category, stock, image_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const products = [
      [
        "Wireless Headphones Pro",
        "High-quality wireless headphones with noise cancellation",
        2999,
        "Audio",
        15,
        "🎧",
      ],
      [
        "Smart Watch Ultra",
        "Fitness tracking smart watch with heart rate monitor",
        4999,
        "Wearables",
        8,
        "⌚",
      ],
      [
        "Ergonomic Laptop Stand",
        "Adjustable laptop stand for better posture",
        1299,
        "Accessories",
        20,
        "💻",
      ],
      [
        "USB-C Fast Charging Cable",
        "Fast charging USB-C cable 2m",
        399,
        "Accessories",
        50,
        "🔌",
      ],
      [
        "RGB Mechanical Keyboard",
        "RGB mechanical gaming keyboard",
        3499,
        "Peripherals",
        12,
        "⌨️",
      ],
      [
        "Precision Gaming Mouse",
        "Ergonomic wireless gaming mouse",
        899,
        "Peripherals",
        25,
        "🖱️",
      ],
    ];

    products.forEach((product) => {
      insert.run(...product);
    });

    console.log("✅ Sample products inserted");
  }
};

module.exports = { db, initDatabase };
