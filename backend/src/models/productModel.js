const { db } = require("../config/database");

class ProductModel {
  static getAll() {
    const stmt = db.prepare("SELECT * FROM products ORDER BY created_at DESC");
    return stmt.all();
  }

  static getById(id) {
    const stmt = db.prepare("SELECT * FROM products WHERE id = ?");
    return stmt.get(id);
  }

  static create(product) {
    const stmt = db.prepare(`
      INSERT INTO products (name, description, price, category, stock, image_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      product.name,
      product.description,
      product.price,
      product.category,
      product.stock,
      product.image_url
    );
    return result.lastInsertRowid;
  }

  static update(id, product) {
    const stmt = db.prepare(`
      UPDATE products
      SET name = ?, description = ?, price = ?, category = ?, stock = ?, image_url = ?
      WHERE id = ?
    `);
    const result = stmt.run(
      product.name,
      product.description,
      product.price,
      product.category,
      product.stock,
      product.image_url,
      id
    );
    return result.changes > 0;
  }

  static delete(id) {
    const stmt = db.prepare("DELETE FROM products WHERE id = ?");
    const result = stmt.run(id);
    return result.changes > 0;
  }

  static updateStock(id, quantity) {
    const stmt = db.prepare(
      "UPDATE products SET stock = stock - ? WHERE id = ?"
    );
    const result = stmt.run(quantity, id);
    return result.changes > 0;
  }
}

module.exports = ProductModel;
