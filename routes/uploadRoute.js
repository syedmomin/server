const express = require("express");
const router = express.Router();
const uploadFile = require("../controller/uploadController");
const verifyToken = require("../middleware/auth").verifyToken;


router.route("/collection-image").post(verifyToken, (req, res) => uploadFile.collectionImage(req, res));

module.exports = router; 