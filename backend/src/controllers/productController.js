const ProductModel = require("../models/productModel");

class ProductController {
  static getAllProducts(req, res, next) {
    try {
      const products = ProductModel.getAll();
      res.json({ success: true, data: products });
    } catch (error) {
      next(error);
    }
  }

  static getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = ProductModel.getById(id);

      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      res.json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  }

  static createProduct(req, res, next) {
    try {
      const { name, description, price, category, stock, image_url } = req.body;

      if (!name || !price || stock === undefined) {
        return res.status(400).json({
          success: false,
          message: "Name, price, and stock are required",
        });
      }

      const productId = ProductModel.create({
        name,
        description,
        price,
        category,
        stock,
        image_url,
      });

      const product = ProductModel.getById(productId);
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  }

  static updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, price, category, stock, image_url } = req.body;

      const updated = ProductModel.update(id, {
        name,
        description,
        price,
        category,
        stock,
        image_url,
      });

      if (!updated) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      const product = ProductModel.getById(id);
      res.json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  }

  static deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = ProductModel.delete(id);

      if (!deleted) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      res.json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
