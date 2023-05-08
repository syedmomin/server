const express = require("express");
const router = express.Router();
//---------------------index-routes----------------------------
// ROUTES IMPORT
router.use("/users", require("./userRoute"));
router.use("/collections", require("./collectionRoute"));
router.use("/products", require("./productRoute"));
router.use("/measurements", require("./measurementRoute"));
router.use("/upload", require("./uploadRoute"));

module.exports = router;
