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

      const sqlQuery = `WITH LedgerReport AS (
        SELECT
            customer_name,
            customer_phone,
            '-' AS Date,
            '-' AS OrderNumber,
            'BALANCE B/D' AS Narration,
            COALESCE(SUM(balance_amount), 0) AS Debit,
            0 AS Credit,
            1 AS SortOrder
        FROM
            order_master
        WHERE
            DATE(created_at) < '${fromDate}' AND customer_name = '${customerName}' AND customer_phone = '${customerMobile}'
        GROUP BY
            customer_name,
            customer_phone
            UNION ALL
  ( SELECT
			'-' customer_name,
            '-' customer_phone,
            '-' AS Date,
            '-' AS OrderNumber,
            'BALANCE B/D' AS Narration,
            0 AS Debit,
            0 AS Credit,
            1 AS SortOrder
        FROM
            order_master
        WHERE NOT EXISTS (
                SELECT 1
                FROM order_master
                WHERE customer_name = '${customerName}' AND customer_phone = '${customerMobile}' AND DATE(created_at) < '${fromDate}' OR created_at IS NULL
            )
  limit 1)
        UNION ALL
        SELECT
            customer_name,
            customer_phone,
            DATE(created_at) AS Date,
            id AS OrderNumber,
            CONCAT('STITCHING ORDER OF ', UPPER(item_master), ' FOR ', UPPER(customer_name)) AS Narration,
            total_amount AS Debit,
            0 AS Credit,
            2 AS SortOrder
        FROM
            order_master
        WHERE
            customer_name = '${customerName}' AND customer_phone = '${customerMobile}' AND DATE(created_at) >= '${fromDate}' AND DATE(created_at) <= '${toDate}'
        UNION ALL
        SELECT
            customer_name,
            customer_phone,
            DATE(created_at) AS Date,
            id AS OrderNumber,
            CONCAT('DELIVERED STITCHING ORDER OF ', UPPER(item_master), ' FOR ', UPPER(customer_name)) AS Narration,
            0 AS Debit,
            amount_received AS Credit,
            3 AS SortOrder
        FROM
            order_master
        WHERE
          amount_received > 0 AND customer_name = '${customerName}' AND customer_phone = '${customerMobile}' AND DATE(created_at) >= '${fromDate}' AND DATE(created_at) <= '${toDate}'
        UNION ALL
        SELECT
            customer_name,
            customer_phone,
            DATE(createdAt) AS Date,
            '-' AS OrderNumber,
            CONCAT('BALANCE PAYMENT COLLECTED THROUGH LEDGER') AS Narration,
            0 AS Debit,
            SUM(collectedAmount) AS Credit,
            4 AS SortOrder
        FROM
           customer_ledger_history
        WHERE
            customer_name = '${customerName}' AND customer_phone = '${customerMobile}' AND DATE(createdAt) >= '${fromDate}' AND DATE(createdAt) <= '${toDate}'
        GROUP BY
            customer_name,
            customer_phone,
            DATE(createdAt)
    )
    SELECT
        Date,
        OrderNumber,
        Narration,
        Debit,
        Credit,
        SUM(Debit - Credit) OVER (PARTITION BY customer_name, customer_phone ORDER BY Date,  SortOrder) AS Balance
    FROM
        LedgerReport
    ORDER BY
        Date,
        SortOrder,
        OrderNumber
        `;
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
            data: error,
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
      if (karigarName != "All") {
        query += ` AND karigarName = ? AND karigarMobile = ?`;
        params.push(karigarName, karigarNumber);
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

      const sqlQuery = ` WITH inventoryReport AS (
        -- Opening Balance
        SELECT
            COALESCE(itemMaster, '-') AS itemMaster,
            COALESCE(itemUOM, '-') AS itemUOM,
            '-' AS TransactionDate,
            '-' AS DocNumber,
            '-' AS DocType,
            'Opening Balance' AS Description,
            COALESCE(SUM(itemQuantity), 0) AS Opening,
            0 AS StockIn,
            0 AS StockOut,
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
            COALESCE(itemMaster, '-') AS itemMaster,
            COALESCE(itemUOM, '-') AS itemUOM,
            '-' AS TransactionDate,
            '-' AS DocNumber,
            '-' AS DocType,
            'Opening Balance' AS Description,
            0 AS Opening,
            0 AS StockIn,
            0 AS StockOut,
            1 AS SortOrder
        FROM
            grn_detail
        WHERE NOT EXISTS (
                SELECT 1
                FROM grn_detail
                WHERE DATE(created_at) < '${fromDate}' OR created_at IS NULL
            )
        GROUP BY
            itemMaster,
            itemUOM
        UNION ALL
        -- GRN
        SELECT
            gd.itemMaster,
            gd.itemUOM,
            DATE(gd.created_at) AS TransactionDate,
            CONCAT('GN-00', gd.masterId) AS DocNumber,
            'GRN' AS DocType,
            gm.supplierName AS Description,
            0 AS Opening,
            SUM(gd.itemQuantity) AS StockIn,
            0 AS StockOut,
            2 AS SortOrder
        FROM
            grn_detail AS gd
        INNER JOIN grn_master AS gm ON gd.masterId = gm.id
        WHERE
            DATE(gd.created_at) BETWEEN '${fromDate}' AND '${toDate}'
        GROUP BY
            gd.itemMaster,
            gd.itemUOM,
            DATE(gd.created_at),
            CONCAT('GN-00', gd.masterId),
            'GRN',
            gm.supplierName
        UNION ALL
        -- Wholesale
        SELECT
            wd.itemMaster,
            wd.itemUOM,
            DATE(wd.created_at) AS TransactionDate,
            CONCAT('WN-00', wd.masterId) AS DocNumber,
            'Wholesale' AS DocType,
            wm.supplierName AS Description,
            0 AS Opening,
            0 AS StockIn,
            SUM(wd.itemQuantity) AS StockOut,
            3 AS SortOrder
        FROM
            wholesale_detail AS wd
        INNER JOIN wholesale_master AS wm ON wd.masterId = wm.id
        WHERE
            DATE(wd.created_at) BETWEEN '${fromDate}' AND '${toDate}'
        GROUP BY
            wd.itemMaster,
            wd.itemUOM,
            DATE(wd.created_at),
            CONCAT('WN-00', wd.masterId),
            'Wholesale',
            wm.supplierName
    )
    
    SELECT
        TransactionDate AS Date,
        DocNumber,
        DocType,
        Description,
        Opening,
        StockIn,
        StockOut,
        SUM(Opening + StockIn - StockOut) OVER(PARTITION BY itemMaster, itemUOM ORDER BY TransactionDate, DocNumber, SortOrder) AS Balance
    FROM
        inventoryReport
    WHERE
        itemMaster = '${itemName}' AND itemUOM = '${itemUOM}'
    GROUP BY
        TransactionDate, DocNumber, DocType, Description, Opening, StockIn, StockOut, itemMaster, itemUOM, SortOrder, TransactionDate
    ORDER BY
        TransactionDate, DocNumber, SortOrder
   `;
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
          CASE WHEN paymentType = 'Recovery us' THEN amount ELSE 0 END AS credit,
          CASE WHEN paymentType <> 'Recovery us' THEN amount ELSE 0 END AS debit,
          SUM(IF(paymentType = 'Recovery us', -amount, amount)) OVER (ORDER BY toDate,id) AS balance  
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
  wholeSalePurchaseReport: async function (req, res) {
    try {
      const { fromDate, toDate } = req.body;
      await db.query(
        `SELECT gd.* ,gm.supplierName AS customerName,gm.created_at AS date, gm.id AS idNumber FROM
         grn_detail as gd INNER JOIN grn_master as gm ON gd.masterId = gm.id WHERE
         gd.created_at >= '${fromDate}' AND gd.created_at <= '${toDate}'`,
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
              message: "Wholesale Fabric Purchase Report Successfully",
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
  wholeSaleSalesReport: async function (req, res) {
    try {
      const { fromDate, toDate } = req.body;
      await db.query(
        `SELECT wd.* ,wm.supplierName AS customerName,wm.created_at AS date, wm.id AS idNumber 
         FROM wholesale_detail as wd INNER JOIN wholesale_master as wm ON wd.masterId = wm.id WHERE
         wd.created_at >= '${fromDate}' AND wd.created_at <= '${toDate}'`,
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
              message: "Wholesale Fabric Sale Report Successfully",
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
  stichCustomerOrderReport: async function (req, res) {
    try {
      const { fromDate, toDate } = req.body;
      await db.query(
        `SELECT * FROM order_master WHERE
        DATE(created_at) >= '${fromDate}' AND DATE(created_at) <= '${toDate}'`,
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
              message: " Stiching Customer Orders Report Successfully",
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
  wholesaleProfitAndLoss: async function (req, res) {
    try {
      const { fromDate, toDate } = req.body;
      const query1 = `SELECT item_master as name,SUM(net_amount) as amount from order_master where 
                        DATE(created_at) >= '${fromDate}' AND DATE(created_at) <= '${toDate}' GROUP BY item_master`;
      const query2 = `SELECT expensesType as name ,SUM(amount) as amount FROM expenses_ledger WHERE businessType = 'Needlework Fabric Wholesale' 
                        AND fromDate  >= '${fromDate}'  AND toDate <= '${toDate}' GROUP BY expensesType`;
      const query3 = `SELECT 'COST OF GOODS SOLD' as name,SUM(totalNetAmount) as amount  from grn_master WHERE
                        DATE(created_at) >= '${fromDate}' AND DATE(created_at) <= '${toDate}'`;

      let results = [];

      const executeQuery = (query) => {
        return new Promise((resolve, reject) => {
          db.query(query, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        });
      };

      results.push(await executeQuery(query1));
      results.push(await executeQuery(query2));
      results.push(await executeQuery(query3));
      results = this.checkEmptyArrays(results);

      res.status(200).send({
        code: 200,
        status: true,
        message: "Result",
        data: results,
      });
    } catch (error) {
      res.status(500).send({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  },
  checkEmptyArrays(data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].length === 0) {
        return [];
      }
    }
    return data;
  },
};

module.exports = report;
