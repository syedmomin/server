const express = require("express");
const router = express.Router();
const controllerPath = require("../controller/reportController");
const verifyToken = require("../middleware/auth").verifyToken;

router
  .route("/invoiceReport")
  .post(verifyToken, (req, res) => controllerPath.orderInvoiceReport(req, res));
router
  .route("/ledgerReport")
  .post(verifyToken, (req, res) =>
    controllerPath.customerLedgerReport(req, res)
  );
router
  .route("/expenseDetail")
  .post(verifyToken, (req, res) =>
    controllerPath.expenseDetailReport(req, res)
  );
router
  .route("/expenseSummary")
  .post(verifyToken, (req, res) =>
    controllerPath.expenseSummaryReport(req, res)
  );
router
  .route("/customerInvoice")
  .post(verifyToken, (req, res) =>
    controllerPath.customerInvoiceReport(req, res)
  );
router
  .route("/goodReceivingNote")
  .post(verifyToken, (req, res) =>
    controllerPath.goodsReceivingReport(req, res)
  );
router
  .route("/orderSummary")
  .post(verifyToken, (req, res) => controllerPath.orderSummaryReport(req, res));

router
  .route("/invoiceSummary")
  .post(verifyToken, (req, res) =>
    controllerPath.invoiceSummaryReport(req, res)
  );

router
  .route("/karigarSummary")
  .post(verifyToken, (req, res) =>
    controllerPath.karigarSummaryReport(req, res)
  );

router
  .route("/inventoryActivity")
  .post(verifyToken, (req, res) =>
    controllerPath.inventoryActivityReport(req, res)
  );

router
  .route("/inventoryReport")
  .post(verifyToken, (req, res) => controllerPath.inventoryReport(req, res));

router
  .route("/karigarLedger")
  .post(verifyToken, (req, res) =>
    controllerPath.karigarLedgerReport(req, res)
  );
module.exports = router;
