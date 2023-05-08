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

// CREATE TABLE `measurement` (
//   `id` int(11) NOT NULL,
//   `size` varchar(50) NOT NULL,
//   `symbol` varchar(50) NOT NULL,
//   `meter` varchar(50) NOT NULL,
//   `length` varchar(50) NOT NULL,
//   `shoulder` varchar(50) NOT NULL,
//   `chest` varchar(50) NOT NULL,
//   `sleeve` varchar(50) NOT NULL,
//   `neck` varchar(50) NOT NULL,
//   `status` tinyint(1) NOT NULL DEFAULT 1,
//   `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
