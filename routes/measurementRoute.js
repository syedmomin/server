const express = require("express");
const router = express.Router();
const measurement = require("../controller/measurementController");
const verifyToken = require("../middleware/auth").verifyToken;

router
  .route("/create-measurement")
  .post(verifyToken, (req, res) => measurement.create(req, res));
router
  .route("/get-all-measurement")
  .post(verifyToken, (req, res) => measurement.getAll(req, res));
router
  .route("/measurement-get-id")
  .post(verifyToken, (req, res) => measurement.getById(req, res));
router
  .route("/update-measurement")
  .post(verifyToken, (req, res) => measurement.update(req, res));
router
  .route("/delete-measurement")
  .post(verifyToken, (req, res) => measurement.delete(req, res));

module.exports = router;
