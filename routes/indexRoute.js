const express = require("express");
const router = express.Router();
//---------------------index-routes----------------------------
// ROUTES IMPORT
router.use("/users", require("./userRoute"));
router.use("/customers", require("./customerRoute"));
router.use("/upload", require("./uploadRoute"));
router.use("/accounts", require("./ledgerRoute"));
router.use("/karigar", require("./karigarRoute"));
router.use("/stich-type", require("./stichTypeRoute"));
router.use("/cuff-type", require("./cuffTypeRoute"));
router.use("/collar-type", require("./collarTypeRoute"));
router.use("/color-type", require("./colorTypeRoute"));
router.use("/placket-type", require("./placketTypeRoute"));
router.use("/item-master", require("./itemMasterRoute"));
router.use("/grn", require("./grnRoute"));
router.use("/order", require("./orderRoute"));
router.use("/karigar-salary", require("./karigarSalaryRoute"));
router.use("/expenses-ledger", require("./expensesLedgerRoute"));

module.exports = router;
