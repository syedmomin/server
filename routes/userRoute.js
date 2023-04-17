const express = require("express");
const router = express.Router();
const user = require("../controller/userController");
const verifyToken = require("../middleware/auth").verifyToken;


router.route("/login-user").post((req, res) => user.loginUser(req, res));
router.route("/new-user").post((req, res) => user.newRegistration(req, res));
router.route("/email-exist").post((req, res) => user.checkEmailExist(req, res));
router.route("/get-users").post(verifyToken, (req, res) => user.userList(req, res));

// router.route("/new-user").post((req, res) => user.create(req, res));
// router.route("/user-profile").post(verifyToken, (req, res) => user.profile(req, res));
// router.route("/user-update").post(verifyToken, (req, res) => user.update(req, res));
// router.route("/user-verification").post((req, res) => user.verify(req, res));
// router.route("/user-confirmation-link-resend").post(verifyToken, (req, res) => user.resendlink(req, res));
// router.route("/user-delete").post(verifyToken, (req, res) => user.delete(req, res));
// router.route("/change-user-password").post(verifyToken, (req, res) => user.changepassword(req, res));
// router.route("/forget-password").post((req, res) => user.forgetpassword(req, res));

module.exports = router;
