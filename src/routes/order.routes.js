const { Router } = require("express");
const { createOrder, getOrder } = require("../controllers/order.controllers");
const authenticate = require("../middlewares/auth.middleware");

const router = Router();

router.post("/api/v1/order/:user", authenticate, createOrder)

router.get("/api/v1/order", authenticate, getOrder)

module.exports = router;