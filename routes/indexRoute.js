const express = require("express");
const router = express.Router();
//---------------------index-routes----------------------------
// ROUTES IMPORT
router.use("/users", require("./userRoute"));
router.use("/customer", require("./customerRoute"));
router.use("/upload", require("./uploadRoute"));
router.use("/accounts", require("./ledgerRoute"));
router.use("/employee", require("./employeeRoute"));
router.use("/stich-type", require("./stichTypeRoute"));
router.use("/cuff-type", require("./cuffTypeRoute"));
router.use("/collar-type", require("./collarTypeRoute"));
router.use("/color-type", require("./colorTypeRoute"));
router.use("/placket-type", require("./placketTypeRoute"));
router.use("/items", require("./itemMasterRoute"));
router.use("/grn", require("./grnRoute"));
router.use("/wholeSale", require("./wholeSaleRoute"));
router.use("/order", require("./orderRoute"));
router.use("/employeeLedger", require("./employeeLedgerRoute"));
router.use("/expenses-ledger", require("./expensesLedgerRoute"));
router.use("/report", require("./reportRoute"));
router.use("/event", require("./eventRoute"));

module.exports = router;
