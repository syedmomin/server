const express = require("express");
const router = express.Router();
const controllerPath = require("../controller/employeeLedgerController");
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

module.exports = router;
