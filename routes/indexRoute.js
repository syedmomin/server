const express = require("express");
const router = express.Router();
//---------------------index-routes----------------------------
// ROUTES IMPORT
router.use("/users", require("./userRoute"));
router.use("/customers", require("./customerRoute"));
router.use("/measurements", require("./measurementRoute"));
router.use("/upload", require("./uploadRoute"));
router.use("/accounts", require("./ledgerRoute"));
router.use("/pocket", require("./pocketRoute"));
router.use("/karigar", require("./karigarRoute"));

module.exports = router;
