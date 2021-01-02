var express = require("express");
var router = express.Router();
var productModel = require("../model/products");
var checkSessionAuth = require("../middleware/checkSessionAuth");

/* GET home page. */
router.get("/dashboard", checkSessionAuth, async function (req, res, next) {
  var products = await productModel.find();
  res.render("products/list", { products });
});
router.get("/add", checkSessionAuth, async function (req, res, next) {
  res.render("products/addProduct");
});

router.post("/add", async function (req, res, next) {
  var product = new productModel();
  product.name = req.body.name;
  product.price = req.body.price;
  product.details = req.body.details;
  product.img = req.body.img;
  await product.save();
  res.redirect("/products/dashboard");
});

router.get("/delete/:id", async function (req, res, next) {
  await productModel.findByIdAndDelete(req.params.id);
  res.redirect("/products/dashboard");
});

router.get("/edit/:id", async function (req, res, next) {
  var id = req.params.id;
  var products = await productModel.findById(id);
  res.render("products/edit", { products });
});

router.post("/edit/:id", async function (req, res, next) {
  var data = req.body;
  var products = await productModel.findById(req.params.id);
  products.name = data.name;
  products.price = data.price;
  await products.save();
  res.redirect("/products/dashboard");
});

router.get("/:id", async function (req, res, next) {
  await productModel.findByIdAndDelete(req.params.id);
  res.redirect("/products/dashboard");
});

module.exports = router;
