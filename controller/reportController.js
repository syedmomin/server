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
      let query = `SELECT * FROM order_master WHERE 1=1`;
      const params = [];

      if (customerName != "All") {
        query += ` AND customer_name = ? AND customer_phone = ?`;
        params.push(customerName, customerMobile);
      }

      query += ` AND DATE(created_at) >= ? AND DATE(created_at) <= ?`;
      params.push(fromDate, toDate);
      await db.query(query, params, (error, results) => {
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
      });
    } catch (error) {
      res.status(500).send({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  },
  invoiceSummaryReport: async function (req, res) {
    try {
      const { customerName, customerMobile, fromDate, toDate } = req.body;
      let query = `SELECT * FROM wholesale_master WHERE 1=1`;
      const params = [];

      if (customerName != "All") {
        query += ` AND supplierName = ? AND supplierNumber = ?`;
        params.push(customerName, customerMobile);
      }

      query += ` AND DATE(created_at) >= ? AND DATE(created_at) <= ?`;
      params.push(fromDate, toDate);
      await db.query(query, params, (error, results) => {
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
      });
    } catch (error) {
      res.status(500).send({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  },
  karigarSummaryReport: async function (req, res) {
    try {
      const { karigarName, karigarNumber, fromDate, toDate } = req.body;
      let query = `SELECT * FROM karigar_salary WHERE 1=1`;
      const params = [];
      if (customerName != "All") {
        query += ` AND karigarName = ? AND karigarMobile = ?`;
        params.push(customerName, customerMobile);
      }

      query += ` AND DATE(created_at) >= ? AND DATE(created_at) <= ?`;
      params.push(fromDate, toDate);
      await db.query(query, params, (error, results) => {
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
      });
    } catch (error) {
      res.status(500).send({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  },
  inventoryActivityReport: async function (req, res) {
    try {
      const { itemName, itemUOM, fromDate, toDate } = req.body;

      const sqlQuery = `WITH
    inventoryReport AS(
    SELECT
    COALESCE(itemMaster, '-') AS itemMaster,
    COALESCE(itemUOM, '-') AS itemUOM,
    COALESCE('-', '-') AS Date,
    COALESCE('-', '-') AS DocNumber,
    'Opening Balance' AS Description,
    COALESCE(SUM(itemQuantity), 0) AS Opening,
    '-' AS StockIn,
    '-' AS StockOut,
    1 AS SortOrder
FROM
    grn_detail
WHERE
    DATE(created_at) < '${fromDate}' OR created_at IS NULL
    GROUP BY
        itemMaster,
        itemUOM
    UNION ALL
    SELECT
    gd.itemMaster,
    gd.itemUOM,
    DATE(gd.created_at) AS Date,
    gd.masterId AS DocNumber,
    gm.supplierName AS Description,
    '-' AS Opening,
    gd.itemQuantity AS StockIn,
    '-' AS StockOut,
    2 AS SortOrder
FROM
    grn_detail as gd INNER JOIN grn_master as gm ON  gd.masterId = gm.id
WHERE
    DATE(gd.created_at) >= '${fromDate}' AND DATE(gd.created_at) <= '${toDate}'
UNION ALL
SELECT
    wd.itemMaster,
    wd.itemUOM,
    DATE(wd.created_at) AS Date,
    wd.masterId AS DocNumber,
    wm.supplierName AS Description,
    '-' AS Opening,
    '-' AS StockIn,
    wd.itemQuantity AS StockOut,
    3 AS SortOrder
FROM
    wholesale_detail as wd INNER JOIN grn_master as wm ON  wd.masterId = wm.id
WHERE
    DATE(wd.created_at) >= '${fromDate}' AND DATE(wd.created_at) <= '${toDate}'
)
SELECT
    Date,
    DocNumber,
    Description,
    Opening,
    StockIn,
    StockOut,
    SUM(StockIn + Opening - StockOut) OVER(
    PARTITION BY itemMaster,
    itemUOM
ORDER BY
    Date,
    DocNumber,
    SortOrder
) AS Balance
FROM
    inventoryReport
WHERE
    itemMaster = '${itemName}' AND itemUOM = '${itemUOM}'
ORDER BY
    Date,
    DocNumber,
    SortOrder`;
      await db.query(sqlQuery, (error, results) => {
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
            message: "Invoice Activity Summary Successfully",
            data: results,
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
  inventoryReport: async function (req, res) {
    try {
      await db.query("SELECT * FROM item_master", async (error, results) => {
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
      });
    } catch (error) {
      res.status(500).send({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  },
  karigarLedgerReport: async function (req, res) {
    try {
      const { karigarName, karigarNumber, fromDate, toDate } = req.body;
      await db.query(
        `SELECT
          toDate,
          paymentType,
          remarks,
          CASE WHEN amount >= 0 THEN amount ELSE 0 END AS credit,
          CASE WHEN amount < 0 THEN -amount ELSE 0 END AS debit,
          SUM(amount) OVER (ORDER BY toDate) AS balance
      FROM
          karigar_salary
      WHERE
          karigarName = '${karigarName}'
          AND karigarMobile = '${karigarNumber}'
          AND toDate >= '${fromDate}'
          AND toDate <= '${toDate}'
      ORDER BY
          toDate;`,
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
              message: "Karigar Ledger Successfully",
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
