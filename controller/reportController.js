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
  OrderInvoiceReport: async function (req, res) {
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

      const sqlQuery = `WITH
    LedgerReport AS(
    SELECT
        customer_name,
        customer_phone,
        '-' AS DATE,
        '-' AS orderNumber,
        CONCAT('BALANCE B/D') AS Narration,
        COALESCE(SUM(balance_amount),
        0) AS Debit,
        0 AS Credit,
        1 AS SortOrder
    FROM
        order_master
    WHERE
        DATE(created_at) <= '2023-08-23'
    GROUP BY
        customer_name,
        customer_phone
    UNION ALL
SELECT
    customer_name,
    customer_phone,
    DATE(created_at) AS DATE,
    id AS orderNumber,
    CONCAT(
        'STITCHING ORDER OF ',
        UPPER(item_master),
        ' FOR ',
        UPPER(customer_name)
    ) AS Narration,
    total_amount AS Debit,
    0 AS Credit,
    2 AS SortOrder
FROM
    order_master
UNION ALL
SELECT
    customer_name,
    customer_phone,
    DATE(created_at) AS DATE,
    id AS orderNumber,
    CONCAT(
        'DELIVERED STITCHING ORDER OF ',
        UPPER(item_master),
        ' FOR ',
        UPPER(customer_name)
    ) AS Narration,
    0 AS Debit,
    amount_received AS Credit,
    3 AS SortOrder
FROM
    order_master
UNION ALL
SELECT
    customer_name,
    customer_phone,
    DATE(created_at) AS DATE,
    '-' AS orderNumber,
    CONCAT(
        'BALANCE PAYMENT COLLECTED THROUGH LEDGER'
    ) AS Narration,
    0 AS Debit,
    SUM(collected_amount) AS Credit,
    4 AS SortOrder
FROM
    customer_ledger
GROUP BY
    customer_name,
    customer_phone,
    DATE(created_at)
)
SELECT
    DATE,
    orderNumber,
    Narration,
    Debit,
    Credit,
    SUM(Debit - Credit) OVER(
    PARTITION BY customer_name,
    customer_phone
ORDER BY
    DATE,
    orderNumber,
    SortOrder
) AS Balance
FROM
    LedgerReport
WHERE
    customer_name = 'jouind' AND customer_phone = '136132156163'
ORDER BY
    DATE,
    orderNumber,
    SortOrder`;
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
              message: "Add Measurement Successfully",
              data: results[0],
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
