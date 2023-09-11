const db = require("../config/dbConnection");

const customerLedger = {
  create: async function (req, res) {
    try {
      const {
        supplierName,
        supplierNumber,
        totalNetAmount,
        amountReceived,
        netBalanceAmount,
      } = req.body;
      const ledgerQuery =
        "SELECT totalOrderAmount, totalAmountReceived, totalNetBalance FROM customer_wholesale_ledger WHERE supplierNumber = ? and supplierName = ?";
      await db.query(
        ledgerQuery,
        [supplierNumber, supplierName],
        async (error, result) => {
          if (error) {
            res.status(500).send({
              code: 500,
              status: false,
              message: error.message,
            });
          }
          if (result.length === 0) {
            const insertLedgerQuery =
              "INSERT INTO customer_wholesale_ledger (supplierName,supplierNumber, totalOrderAmount, totalAmountReceived, totalNetBalance) VALUES (?, ?, ?,?,?)";
            await db.query(insertLedgerQuery, [
              supplierName,
              supplierNumber,
              totalNetAmount,
              amountReceived,
              netBalanceAmount,
            ]);
          } else {
            newTotalAmount = result[0].totalOrderAmount + totalNetAmount;
            newAmountReceived = result[0].totalAmountReceived + amountReceived;
            newNetBalance = result[0].totalNetBalance + netBalanceAmount;

            const updateLedgerQuery =
              "UPDATE customer_wholesale_ledger SET totalOrderAmount = ?, totalAmountReceived = ?, totalNetBalance = ? WHERE supplierNumber = ? and supplierName = ?";
            await db.query(updateLedgerQuery, [
              newTotalAmount,
              newAmountReceived,
              newNetBalance,
              supplierNumber,
              supplierName,
            ]);
          }
        }
      );
      return true;
    } catch (error) {
      // Handle errors
      return res.status(500).send({
        code: 500,
        status: false,
        message: error.message,
      });
    }
  },
  delete: async function (req, res) {
    try {
      await db.query(
        "SELECT totalNetAmount, amountReceived, netBalanceAmount,supplierName,supplierNumber FROM wholesale_master WHERE id = ?",
        [req.body.id],
        async (error, result) => {
          if (error) {
            res.status(500).send({
              code: 500,
              status: false,
              message: error.message,
            });
          }
          const {
            totalNetAmount,
            amountReceived,
            netBalanceAmount,
            supplierName,
            supplierNumber,
          } = result[0];
          await db.query(
            "SELECT totalOrderAmount, totalAmountReceived, totalNetBalance FROM customer_wholesale_ledger WHERE supplierNumber = ? and supplierName = ?",
            [supplierNumber, supplierName],
            async (error, ledgerAmount) => {
              if (error) {
                res.status(500).send({
                  code: 500,
                  status: false,
                  message: error.message,
                });
              }
              let newTotalAmount =
                ledgerAmount[0].totalOrderAmount - totalNetAmount;
              let newAmountReceived =
                ledgerAmount[0].totalAmountReceived - amountReceived;
              let newNetBalance =
                ledgerAmount[0].totalNetBalance - netBalanceAmount;
              const updateLedgerQuery =
                "UPDATE customer_wholesale_ledger SET totalOrderAmount = ?, totalAmountReceived = ?, totalNetBalance = ? WHERE supplierNumber = ? and supplierName = ?";
              await db.query(updateLedgerQuery, [
                newTotalAmount,
                newAmountReceived,
                newNetBalance,
                supplierNumber,
                supplierName,
              ]);
            }
          );
        }
      );
      return true;
    } catch (error) {
      return res.status(500).send({
        code: 500,
        status: false,
        message: error.message,
      });
    }
  },
  update: async function (req, res) {
    try {
      const query = `
      SELECT 
          om.totalNetAmount AS wholesale_totalAmount,
          om.amountReceived AS wholesale_amountReceived,
          om.netBalanceAmount AS wholesale_netBalance,
          cl.totalOrderAmount AS ledger_total_amount,
          cl.totalAmountReceived AS ledger_total_received,
          cl.totalNetBalance AS ledger_total_balance
      FROM wholesale_master AS om
      JOIN customer_wholesale_ledger AS cl
      ON om.supplierName = cl.supplierName AND om.supplierNumber = cl.supplierNumber
      WHERE om.id = ? AND om.supplierName = ? AND om.supplierNumber = ?
  `;
      await db.query(
        query,
        [req.body.id, req.body.supplierName, req.body.supplierNumber],
        async (error, result) => {
          if (error) {
            res.status(500).send({
              code: 500,
              status: false,
              message: error.message,
            });
          }
          const {
            wholesale_totalAmount,
            wholesale_amountReceived,
            wholesale_netBalance,
            ledger_total_amount,
            ledger_total_received,
            ledger_total_balance,
          } = result[0];
          updateAmount =
            ledger_total_amount - wholesale_totalAmount + req.body.total_amount;
          updateReceived =
            ledger_total_received -
            wholesale_amountReceived +
            req.body.amountReceived;
          updateBalance =
            ledger_total_balance -
            wholesale_netBalance +
            req.body.netBalanceAmount;
          const updateLedgerQuery =
            "UPDATE customer_wholesale_ledger SET totalOrderAmount = ?, totalAmountReceived = ?, totalNetBalance = ? WHERE supplierNumber = ? and supplierName = ?";
          await db.query(updateLedgerQuery, [
            updateAmount,
            updateReceived,
            updateBalance,
            req.body.supplierNumber,
            req.body.supplierName,
          ]);
          return true;
        }
      );
    } catch (error) {
      return res.status(500).send({
        code: 500,
        status: false,
        message: error.message,
      });
    }
  },
  ledgerByCustomer: async function (req) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT id, totalOrderAmount, totalAmountReceived, totalNetBalance FROM customer_wholesale_ledger WHERE supplierName = ? and supplierNumber = ?",
        [req.body.supplierName, req.body.supplierNumber],
        (error, ledgerAmount) => {
          if (error) {
            reject(error);
          } else {
            resolve(ledgerAmount[0]);
          }
        }
      );
    });
  },
  customerLedgerUpdate: async function (req, res) {
    try {
      const {
        id,
        totalAmount,
        totalReceived,
        totalBalance,
        collectedAmount,
        advancePayment,
      } = req.body;
      db.query(
        "UPDATE customer_wholesale_ledger SET total_amount = ?, total_received = ?, total_balance = ?, collected_amount = ?, advance_payment = ? WHERE id = ?",
        [
          totalAmount,
          totalReceived,
          totalBalance,
          collectedAmount,
          advancePayment,
          id,
        ],
        (error, ledgerAmount) => {
          if (error) {
            res.status(500).send({
              code: 500,
              status: false,
              message: error.message,
            });
          }
          if (ledgerAmount.affectedRows > 0) {
            res.status(200).send({
              code: 200,
              status: true,
              message: "Update record successfully",
            });
          }
        }
      );
    } catch (error) {
      return res.status(500).send({
        code: 500,
        status: false,
        message: error.message,
      });
    }
  },
};

module.exports = customerLedger;
