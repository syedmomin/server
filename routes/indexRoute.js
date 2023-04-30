const express = require("express");
const router = express.Router();
//---------------------index-routes----------------------------
// ROUTES IMPORT
router.use("/users", require("./userRoute"));
router.use("/collections", require("./collectionRoute"));
router.use("/produts", require("./productRoute"));
router.use("/upload", require("./uploadRoute"));



module.exports = router;