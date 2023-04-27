const express = require("express");
const router = express.Router();
const product = require("../controller/productController");
const verifyToken = require("../middleware/auth").verifyToken;


router.route("/create-product").post(verifyToken, (req, res) => product.create(req, res));
router.route("/get-all-product").post(verifyToken, (req, res) => product.getAll(req, res));
router.route("/product-get-id").post(verifyToken, (req, res) => product.getById(req, res));
router.route("/update-product").post(verifyToken, (req, res) => product.update(req, res));
router.route("/delete-product").post(verifyToken, (req, res) => product.delete(req, res));

module.exports = router;