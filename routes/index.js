var express = require("express");
var productModel = require("../model/products");

var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  var products = await productModel.find();

  console.log(req.session.user);
  res.render("products/productPage", { products });
});

module.exports = router;
