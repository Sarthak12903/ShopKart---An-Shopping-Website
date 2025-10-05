const express = require("express");
const CartController = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// All cart routes require authentication
router.use(authMiddleware);

router.get("/", CartController.getCart);
router.post("/", CartController.addToCart);
router.put("/:id", CartController.updateCartItem);
router.delete("/:id", CartController.removeFromCart);
router.delete("/", CartController.clearCart);

module.exports = router;
