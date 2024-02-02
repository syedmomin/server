const db = require("../config/dbConnection");

const customerLedger = {
  create: async function (req, res) {
    try {
      const {
        customer_name,
        customer_phone,
        total_amount,
        amount_received,
        balance_amount,
      } = req.body;
      const ledgerQuery =
        "SELECT total_amount, total_received, total_balance FROM customer_ledger WHERE customer_phone = ? and customer_name = ?";
      await db.query(
        ledgerQuery,
        [customer_phone, customer_name],
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
              "INSERT INTO customer_ledger (customer_name,customer_phone, total_amount, total_received, total_balance,collected_amount) VALUES (?, ?, ?, ?,?,?)";
            await db.query(insertLedgerQuery, [
              customer_name,
              customer_phone,
              total_amount,
              amount_received,
              balance_amount,
              0,
            ]);
          } else {
            newTotalAmount = result[0].total_amount + total_amount;
            newAmountReceived = result[0].total_received + amount_received;
            newNetBalance = result[0].total_balance + balance_amount;

            const updateLedgerQuery =
              "UPDATE customer_ledger SET total_amount = ?, total_received = ?, total_balance = ? WHERE customer_phone = ? and customer_name = ?";
            await db.query(updateLedgerQuery, [
              newTotalAmount,
              newAmountReceived,
              newNetBalance,
              customer_phone,
              customer_name,
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
        "SELECT total_amount, amount_received, balance_amount,customer_name,customer_phone FROM order_master WHERE id = ?",
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
            total_amount,
            amount_received,
            balance_amount,
            customer_name,
            customer_phone,
          } = result[0];
          await db.query(
            "SELECT total_amount, total_received, total_balance FROM customer_ledger WHERE customer_phone = ? and customer_name = ?",
            [customer_phone, customer_name],
            async (error, ledgerAmount) => {
              if (error) {
                res.status(500).send({
                  code: 500,
                  status: false,
                  message: error.message,
                });
              }
              let newTotalAmount = ledgerAmount[0].total_amount - total_amount;
              let newAmountReceived =
                ledgerAmount[0].total_received - amount_received;
              let newNetBalance =
                ledgerAmount[0].total_balance - balance_amount;
              const updateLedgerQuery =
                "UPDATE customer_ledger SET total_amount = ?, total_received = ?, total_balance = ? WHERE customer_phone = ? and customer_name = ?";
              await db.query(updateLedgerQuery, [
                newTotalAmount,
                newAmountReceived,
                newNetBalance,
                customer_phone,
                customer_name,
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
          om.total_amount AS order_total_amount,
          om.amount_received AS order_amount_received,
          om.balance_amount AS order_balance_amount,
          cl.total_amount AS ledger_total_amount,
          cl.total_received AS ledger_total_received,
          cl.total_balance AS ledger_total_balance
      FROM order_master AS om
      JOIN customer_ledger AS cl
      ON om.customer_name = cl.customer_name AND om.customer_phone = cl.customer_phone
      WHERE om.id = ? AND om.customer_name = ? AND om.customer_phone = ?
  `;
  console.log(req.body.id, req.body.customer_name, req.body.customer_phone);
      await db.query(
        query,
        [req.body.id, req.body.customer_name, req.body.customer_phone],
        async (error, result) => {
          if (error) {
            res.status(500).send({
              code: 500,
              status: false,
              message: error.message,
            });
          }
          console.log(result[0]);
          const {
            order_total_amount,
            order_amount_received,
            order_balance_amount,
            ledger_total_amount,
            ledger_total_received,
            ledger_total_balance,
          } = result[0];
        
          updateAmount =
            ledger_total_amount - order_total_amount + req.body.total_amount;
          updateReceived =
            ledger_total_received -
            order_amount_received +
            req.body.amount_received;
          updateBalance =
            ledger_total_balance -
            order_balance_amount +
            req.body.balance_amount;
          const updateLedgerQuery =
            "UPDATE customer_ledger SET total_amount = ?, total_received = ?, total_balance = ? WHERE customer_phone = ? and customer_name = ?";
          await db.query(updateLedgerQuery, [
            updateAmount,
            updateReceived,
            updateBalance,
            req.body.customer_phone,
            req.body.customer_name,
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
        "SELECT * FROM customer_ledger WHERE customer_name = ? and customer_phone = ?",
        [req.body.customer_name, req.body.customer_phone],
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
        customer_name,
        customer_phone,
        collectedNow,
        totalAmount,
        totalReceived,
        totalBalance,
        collectedAmount,
        advancePayment,
      } = req.body;
      await db.query(
        "UPDATE customer_ledger SET total_amount = ?, total_received = ?, total_balance = ?, collected_amount = ?, advance_payment = ? WHERE id = ?",
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
            db.query(
              "INSERT INTO customer_ledger_history (customer_name,customer_phone,collectedAmount) VALUES (?,?,?)",
              [customer_name, customer_phone, collectedNow]
            );
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
  customerTotalBalance: async function (req, res) {
    try {
      await db.query(
        "SELECT total_balance FROM customer_ledger WHERE customer_name = ? and customer_phone = ?",
        [req.body.customer_name, req.body.customer_phone],
        (error, results) => {
          if (error) {
            res.status(500).send({
              code: 500,
              status: false,
              message: error,
            });
          }

          if (results.length > 0) {
            res.status(200).send({
              code: 200,
              status: true,
              message: "Get details by customer balance",
              data: results[0],
            });
          } else {
            res.status(206).send({
              code: 206,
              status: false,
              message: "This Customer Not Exist!",
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
