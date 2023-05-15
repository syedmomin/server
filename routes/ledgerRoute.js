const express = require("express");
const router = express.Router();
const ledger = require("../controller/ledgerController");
const verifyToken = require("../middleware/auth").verifyToken;

router
    .route("/create-ledger")
    .post(verifyToken, (req, res) => ledger.create(req, res));
router
    .route("/get-all-ledger")
    .post(verifyToken, (req, res) => ledger.getAll(req, res));
router
    .route("/ledger-get-id")
    .post(verifyToken, (req, res) => ledger.getById(req, res));
router
    .route("/update-ledger")
    .post(verifyToken, (req, res) => ledger.update(req, res));
router
    .route("/delete-ledger")
    .post(verifyToken, (req, res) => ledger.delete(req, res));

module.exports = router;
