const CartModel = require("../models/cartModel");
const ProductModel = require("../models/productModel");

class CartController {
  static getCart(req, res, next) {
    try {
      const userId = req.user.userId;
      const items = CartModel.getAll(userId);
      const total = CartModel.getTotal(userId);

      res.json({
        success: true,
        data: { items, total, count: items.length },
      });
    } catch (error) {
      next(error);
    }
  }

  static addToCart(req, res, next) {
    try {
      const userId = req.user.userId;
      const { product_id, quantity = 1 } = req.body;

      if (!product_id) {
        return res.status(400).json({
          success: false,
          message: "Product ID is required",
        });
      }

      const product = ProductModel.getById(product_id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: "Insufficient stock",
        });
      }

      const cartId = CartModel.addItem(userId, product_id, quantity);
      const cartItem = CartModel.getById(cartId, userId);

      res.status(201).json({ success: true, data: cartItem });
    } catch (error) {
      next(error);
    }
  }

  static updateCartItem(req, res, next) {
    try {
      const userId = req.user.userId;
      const { id } = req.params;
      const { quantity } = req.body;

      if (quantity === undefined || quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Valid quantity is required",
        });
      }

      const cartItem = CartModel.getById(id, userId);

      if (!cartItem) {
        return res.status(404).json({
          success: false,
          message: "Cart item not found",
        });
      }

      const product = ProductModel.getById(cartItem.product_id);

      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: "Insufficient stock",
        });
      }

      const updated = CartModel.updateQuantity(id, userId, quantity);

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: "Cart item not found",
        });
      }

      const updatedItem = CartModel.getById(id, userId);
      res.json({ success: true, data: updatedItem });
    } catch (error) {
      next(error);
    }
  }

  static removeFromCart(req, res, next) {
    try {
      const userId = req.user.userId;
      const { id } = req.params;
      const removed = CartModel.removeItem(id, userId);

      if (!removed) {
        return res.status(404).json({
          success: false,
          message: "Cart item not found",
        });
      }

      res.json({ success: true, message: "Item removed from cart" });
    } catch (error) {
      next(error);
    }
  }

  static clearCart(req, res, next) {
    try {
      const userId = req.user.userId;
      const deletedCount = CartModel.clearCart(userId);

      res.json({
        success: true,
        message: "Cart cleared successfully",
        deletedCount,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CartController;
