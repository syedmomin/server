const db = require("../config/dbConnection");

const report = {
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
      await db.query(
        `WITH
        LedgerReport AS(    
          SELECT customer_name,customer_phone,DATE(created_at) AS Date,id AS OrderNumber,
          CONCAT('DELIVERED STITCHING ORDER OF ',UPPER(item_master),' FOR ',UPPER(customer_name)) AS Narration,
          0 AS Debit,amount_received AS Credit,2 AS SortOrder FROM order_master
              
          UNION ALL
              
          SELECT customer_name,customer_phone,DATE(created_at) AS Date,id AS OrderNumber,
          CONCAT('STITCHING ORDER OF ', UPPER(item_master),' FOR ',UPPER(customer_name)) AS Narration,
          total_amount AS Debit,0 AS Credit,1 AS SortOrder FROM order_master
          
          UNION ALL
  
      
          SELECT customer_name,customer_phone,DATE(createdAt) AS Date,null AS OrderNumber,
          CONCAT('BALANCE PAYMENT COLLECTED THROUGH LEDGER') AS Narration,0 AS Debit,
          SUM(collectedAmount) AS Credit,3 AS SortOrder FROM customer_ledger_history
          GROUP BY customer_name,customer_phone,DATE(createdAt)
    )
    SELECT DATE_FORMAT(DATE, '%Y-%m-%d') AS Date,OrderNumber,Narration,Debit,Credit,SUM(Debit - Credit) OVER(PARTITION BY customer_name,customer_phone
    ORDER BY SortOrder,DATE,orderNumber) AS Balance FROM LedgerReport
    WHERE customer_name = '${customerName}' AND customer_phone = '${customerMobile}' AND DATE BETWEEN '${fromDate}' AND '${toDate}'
    ORDER BY  DATE,orderNumber`,
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
              message: "Get details by id",
              data: results,
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
