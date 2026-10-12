const express = require("express");
const router = express.Router();
var authenticate=require('../authenticate.js')
const {deleteCart, addToCart,getCart ,checkOut, getPurchases,getMyOrders,getPurchase,getMyOrder} = require("../operations/cartoperations");
router.use(authenticate)
router.post("/add", addToCart);
router.get("/",getCart);
router.delete("/:id",deleteCart)
router.post("/checkOut",checkOut)
router.get("/getPurchases",getPurchases)
router.get("/getMyOrders",getMyOrders)
router.get("/getPurchase/:user_id/:order_id",getPurchase)
router.get("/getMyOrder/:order_id",getMyOrder)

module.exports = router;