const { Router } = require("express");
const { addToCart, getCart } = require("../controllers/cart.controllers");
const authenticate = require("../middlewares/auth.middleware");
const { addToCartValidator } = require("../validators/cart.validators")

const router = Router();

router.post("/api/v1/cart", addToCartValidator, authenticate, addToCart)

router.get("/api/v1/cart", authenticate, getCart)

module.exports = router;