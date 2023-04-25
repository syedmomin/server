const express = require("express");
const router = express.Router();
const user = require("../controller/userController");
const verifyToken = require("../middleware/auth").verifyToken;



router.route("/get-all-collection").post(verifyToken, (req, res) => user.userList(req, res));
router.route("/collection-get-id").post(verifyToken, (req, res) => user.userList(req, res));
router.route("/update-collection").post(verifyToken, (req, res) => user.userList(req, res));
router.route("/delete-collection").post(verifyToken, (req, res) => user.userList(req, res));
router.route("/create-collection").post(verifyToken, (req, res) => user.userList(req, res));

module.exports = router;