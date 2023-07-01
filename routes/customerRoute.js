const express = require("express");
const router = express.Router();
const customer = require("../controller/customerController");
const verifyToken = require("../middleware/auth").verifyToken;

router
    .route("/create")
    .post(verifyToken, (req, res) => customer.create(req, res));
router
    .route("/get-all")
    .post(verifyToken, (req, res) => customer.getAll(req, res));
router
    .route("/get-by-id")
    .post(verifyToken, (req, res) => customer.getById(req, res));
router
    .route("/update")
    .post(verifyToken, (req, res) => customer.update(req, res));
router
    .route("/delete")
    .post(verifyToken, (req, res) => customer.delete(req, res));

module.exports = router;
