const express = require("express");
const router = express.Router();
const uploadFile = require("../controller/uploadController");
const verifyToken = require("../middleware/auth").verifyToken;


router.route("/assets-image").post(verifyToken, (req, res) => uploadFile.assetsImage(req, res));

module.exports = router; 