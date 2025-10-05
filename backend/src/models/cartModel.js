const { db } = require("../config/database");

class CartModel {
  static getAll(userId) {
    const stmt = db.prepare(`
      SELECT c.id, c.product_id, c.quantity, c.added_at,
             p.name, p.description, p.price, p.image_url, p.stock
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = ?
    `);
    return stmt.all(userId);
  }

  static getById(id, userId) {
    const stmt = db.prepare(`
      SELECT c.id, c.product_id, c.quantity, c.added_at,
             p.name, p.description, p.price, p.image_url, p.stock
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.id = ? AND c.user_id = ?
    `);
    return stmt.get(id, userId);
  }

  static addItem(userId, productId, quantity) {
    // Check if item already exists
    const existing = db
      .prepare("SELECT * FROM cart WHERE product_id = ? AND user_id = ?")
      .get(productId, userId);

    if (existing) {
      // Update quantity
      const stmt = db.prepare(
        "UPDATE cart SET quantity = quantity + ? WHERE product_id = ? AND user_id = ?"
      );
      stmt.run(quantity, productId, userId);
      return existing.id;
    } else {
      // Insert new item
      const stmt = db.prepare(
        "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)"
      );
      const result = stmt.run(userId, productId, quantity);
      return result.lastInsertRowid;
    }
  }

  static updateQuantity(id, userId, quantity) {
    const stmt = db.prepare(
      "UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?"
    );
    const result = stmt.run(quantity, id, userId);
    return result.changes > 0;
  }

  static removeItem(id, userId) {
    const stmt = db.prepare("DELETE FROM cart WHERE id = ? AND user_id = ?");
    const result = stmt.run(id, userId);
    return result.changes > 0;
  }

  static clearCart(userId) {
    const stmt = db.prepare("DELETE FROM cart WHERE user_id = ?");
    const result = stmt.run(userId);
    return result.changes;
  }

  static getTotal(userId) {
    const stmt = db.prepare(`
      SELECT SUM(c.quantity * p.price) as total
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = ?
    `);
    const result = stmt.get(userId);
    return result.total || 0;
  }
}

module.exports = CartModel;
