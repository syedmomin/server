const express = require("express");
const router = express.Router();
const controllerPath = require("../controller/orderController");
const ledgerPath = require("../controller/customerLedgerController");
const verifyToken = require("../middleware/auth").verifyToken;

router
  .route("/create")
  .post(verifyToken, (req, res) => controllerPath.create(req, res));
router
  .route("/get-all")
  .post(verifyToken, (req, res) => controllerPath.getAll(req, res));
router
  .route("/get-by-id")
  .post(verifyToken, (req, res) => controllerPath.getById(req, res));
router
  .route("/update")
  .post(verifyToken, (req, res) => controllerPath.update(req, res));
router
  .route("/delete")
  .post(verifyToken, (req, res) => controllerPath.delete(req, res));
router
  .route("/get-by-customer")
  .post(verifyToken, (req, res) => controllerPath.getByCustomer(req, res));
router
  .route("/updateCustomerLedger")
  .post(verifyToken, (req, res) => ledgerPath.customerLedgerUpdate(req, res));
router
  .route("/getCustomerTotalBalance")
  .post(verifyToken, (req, res) => ledgerPath.customerTotalBalance(req, res));

router
  .route("/getCustomerLastRecord")
  .post(verifyToken, (req, res) => controllerPath.customerLastRecord(req, res));

module.exports = router;
