const { db } = require("../config/database");
const bcrypt = require("bcryptjs");

class UserModel {
  static async create(name, email, password) {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const stmt = db.prepare(`
      INSERT INTO users (name, email, password)
      VALUES (?, ?, ?)
    `);

    try {
      const result = stmt.run(name, email, hashedPassword);
      return result.lastInsertRowid;
    } catch (error) {
      if (error.message.includes("UNIQUE constraint failed")) {
        throw new Error("Email already exists");
      }
      throw error;
    }
  }

  static findByEmail(email) {
    const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
    return stmt.get(email);
  }

  static findById(id) {
    const stmt = db.prepare(
      "SELECT id, name, email, created_at FROM users WHERE id = ?"
    );
    return stmt.get(id);
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = UserModel;
