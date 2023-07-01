const express = require("express");
const router = express.Router();
const uploadFile = require("../controller/uploadController");
const verifyToken = require("../middleware/auth").verifyToken;

router
  .route("/save-image")
  .post(verifyToken, (req, res) => uploadFile.assetsImage(req, res));

module.exports = router;
