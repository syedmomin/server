const db = require("../config/dbConnection");

const report = {
  customerInvoiceReport: async function (req, res) {
    try {
      await db.query(
        "SELECT o.*, c.city,c.email,c.address FROM wholesale_master AS o INNER JOIN customer AS c ON o.supplierName = c.full_name and o.supplierNumber = c.phone WHERE o.id = ?",
        [req.body.invoiceId],
        async (error, results) => {
          if (error) {
            res.status(500).send({
              code: 500,
              status: false,
              message: error,
            });
          }
          await db.query(
            "SELECT * FROM wholesale_detail WHERE masterId = ?",
            [req.body.invoiceId],
            (error, detailOrder) => {
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
                  message: "Get details by id",
                  data: { ...results[0], details: detailOrder },
                });
              } else {
                res.status(206).send({
                  code: 206,
                  status: false,
                  message: "This Id Not Exist!",
                });
              }
            }
          );
        }
      );
    } catch (error) {
      res.status(500).send({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  },
  goodsReceivingReport: async function (req, res) {
    try {
      await db.query(
        "SELECT o.*, c.city,c.email,c.address FROM grn_master AS o INNER JOIN customer AS c ON o.supplierName = c.full_name and o.supplierNumber = c.phone WHERE o.id = ?",
        [req.body.orderId],
        async (error, results) => {
          if (error) {
            res.status(500).send({
              code: 500,
              status: false,
              message: error,
            });
          }
          await db.query(
            "SELECT * FROM grn_detail WHERE masterId = ?",
            [req.body.orderId],
            (error, detailOrder) => {
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
                  message: "Get details by id",
                  data: { ...results[0], details: detailOrder },
                });
              } else {
                res.status(206).send({
                  code: 206,
                  status: false,
                  message: "This Id Not Exist!",
                });
              }
            }
          );
        }
      );
    } catch (error) {
      res.status(500).send({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  },
  orderInvoiceReport: async function (req, res) {
    try {
      await db.query(
        "SELECT o.*, c.city,c.email,c.address FROM order_master AS o INNER JOIN customer AS c ON o.customer_name = c.full_name and o.customer_phone = c.phone WHERE o.id = ?",
        [req.body.orderId],
        async (error, results) => {
          if (error) {
            res.status(500).send({
              code: 500,
              status: false,
              message: error,
            });
          }
          await db.query(
            "SELECT * FROM order_detail WHERE master_id = ?",
            [req.body.orderId],
            (error, detailOrder) => {
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
                  message: "Get details by id",
                  data: { ...results[0], details: detailOrder },
                });
              } else {
                res.status(206).send({
                  code: 206,
                  status: false,
                  message: "This Id Not Exist!",
                });
              }
            }
          );
        }
      );
    } catch (error) {
      res.status(500).send({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  },
  customerLedgerReport: async function (req, res) {
    try {
      const { customerName, customerMobile, fromDate, toDate } = req.body;

      const sqlQuery = `WITH LedgerReport
      AS (SELECT customer_name,
                 customer_phone,
                 '-' AS Date,
                 '-' AS OrderNumber,
                 CONCAT('BALANCE B/D') AS Narration,
                 COALESCE(SUM(balance_amount), 0) AS Debit,
                 0 AS Credit,
                 1 AS SortOrder
          FROM order_master
          WHERE DATE(created_at) <= '${fromDate}'
          GROUP BY customer_name,
                   customer_phone
          UNION ALL
          SELECT customer_name,
                 customer_phone,
                 DATE(created_at) AS Date,
                 id AS OrderNumber,
                 CONCAT('STITCHING ORDER OF ', UPPER(item_master), ' FOR ', UPPER(customer_name)) AS Narration,
                 total_amount AS Debit,
                 0 AS Credit,
                 2 AS SortOrder
          FROM order_master
          WHERE customer_name = '${customerName}'
                AND customer_phone = '${customerMobile}'
                AND DATE(created_at) >= '${fromDate}'
                AND DATE(created_at) <= '  ${toDate}'
          UNION ALL
          SELECT customer_name,
                 customer_phone,
                 DATE(created_at) AS Date,
                 id AS OrderNumber,
                 CONCAT('DELIVERED STITCHING ORDER OF ', UPPER(item_master), ' FOR ', UPPER(customer_name)) AS Narration,
                 0 AS Debit,
                 amount_received AS Credit,
                 3 AS SortOrder
          FROM order_master
          WHERE customer_name = '${customerName}'
                AND customer_phone = '${customerMobile}'
                AND DATE(created_at) >= '${fromDate}'
                AND DATE(created_at) <= '  ${toDate}'
          UNION ALL
          SELECT customer_name,
                 customer_phone,
                 DATE(created_at) AS Date,
                 '-' AS OrderNumber,
                 CONCAT('BALANCE PAYMENT COLLECTED THROUGH LEDGER') AS Narration,
                 0 AS Debit,
                 SUM(collected_amount) AS Credit,
                 4 AS SortOrder
          FROM customer_ledger
          WHERE customer_name = '${customerName}'
                AND customer_phone = '${customerMobile}'
                AND DATE(created_at) >= '${fromDate}'
                AND DATE(created_at) <= '${toDate}'
          GROUP BY customer_name,
                   customer_phone,
                   DATE(created_at)
         )
      SELECT Date,
             OrderNumber,
             Narration,
             Debit,
             Credit,
             SUM(Debit - Credit) OVER (PARTITION BY customer_name,
                                                    customer_phone
                                       ORDER BY Date,
                                                OrderNumber,
                                                SortOrder
                                      ) AS Balance
      FROM LedgerReport
      ORDER BY Date,OrderNumber,SortOrder`;
      await db.query(sqlQuery, (error, results) => {
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
            message: "Get details by id",
            data: results,
          });
        } else {
          res.status(206).send({
            code: 206,
            status: false,
            message: "This Id Not Exist!",
            data: sqlQuery,
          });
        }
      });
    } catch (error) {
      res.status(500).send({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  },
  expenseDetailReport: async function (req, res) {
    try {
      const { businessType, expensesType, fromDate, toDate } = req.body;
      await db.query(
        `SELECT * FROM expenses_ledger WHERE businessType = ? AND expensesType = ? AND fromDate >= ?  AND toDate <= ?`,
        [businessType, expensesType, fromDate, toDate],
        (error, results) => {
          if (error) {
            res.status(500).send({
              code: 500,
              status: false,
              message: error,
            });
          } else {
            res.status(200).send({
              code: 200,
              status: true,
              message: "Expenses detail Successfully",
              data: results,
            });
          }
        }
      );
    } catch (error) {
      res.status(500).send({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  },
  expenseSummaryReport: async function (req, res) {
    try {
      const { businessType, fromDate, toDate } = req.body;
      await db.query(
        `SELECT * FROM expenses_ledger WHERE businessType = ? AND fromDate >= ?  AND toDate <= ?`,
        [businessType, fromDate, toDate],
        (error, results) => {
          if (error) {
            res.status(500).send({
              code: 500,
              status: false,
              message: error,
            });
          } else {
            res.status(200).send({
              code: 200,
              status: true,
              message: "Expenses detail Successfully",
              data: results,
            });
          }
        }
      );
    } catch (error) {
      res.status(500).send({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  },
  orderSummaryReport: async function (req, res) {
    try {
      const { customerName, customerMobile, fromDate, toDate } = req.body;
      await db.query(
        `SELECT * FROM order_master WHERE customer_name = ? AND customer_phone = ? AND DATE(created_at) >= ? AND DATE(created_at) <= ?`,
        [customerName, customerMobile, fromDate, toDate],
        (error, results) => {
          if (error) {
            res.status(500).send({
              code: 500,
              status: false,
              message: error,
            });
          } else {
            res.status(200).send({
              code: 200,
              status: true,
              message: "Order Summary Successfully",
              data: results,
            });
          }
        }
      );
    } catch (error) {
      res.status(500).send({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  },
};

module.exports = report;
