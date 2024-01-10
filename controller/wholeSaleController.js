const db = require("../config/dbConnection");
const wholeSaleLedger = require("../controller/customerWholesaleLedgerController");
const updateQuantity = require("./itemMasterController");

const collection = {
  create: async function (req, res) {
    try {
      const {
        transactionDate,
        deliveryDate,
        supplierName,
        supplierNumber,
        personName,
        totalDeliveryCost,
        amountReceived,
        netBalanceAmount,
        totalNetAmount,
        note,
        details,
      } = req.body;

      await db.query(
        "INSERT INTO wholesale_master (transactionDate,deliveryDate,supplierName,supplierNumber,personName,totalDeliveryCost,amountReceived,netBalanceAmount,totalNetAmount,note) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [
          transactionDate,
          deliveryDate,
          supplierName,
          supplierNumber,
          personName,
          totalDeliveryCost,
          amountReceived,
          netBalanceAmount,
          totalNetAmount,
          note,
        ],
        async (error, results) => {
          if (error) {
            res.status(500).send({
              code: 500,
              status: false,
              message: error,
            });
          }
          await wholeSaleLedger.create(req, res);
          const masterId = results.insertId;
          try {
            await Promise.all(
              details.map(async (detail) => {
                await db.query(
                  "INSERT INTO wholesale_detail (masterId,itemMaster,itemUOM,itemArticle,itemColor,itemQuantity,itemPrice,itemAmount,itemDelivery,itemNetSalePrice,itemNetAmount,itemImage) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
                  [
                    masterId,
                    detail.itemMaster,
                    detail.itemUOM,
                    detail.itemArticle,
                    detail.itemColor,
                    detail.itemQuantity,
                    detail.itemPrice,
                    detail.itemAmount,
                    detail.itemDelivery,
                    detail.itemNetSalePrice,
                    detail.itemNetAmount,
                    detail.itemImage,
                  ]
                );
              })
            );
            updateQuantity.getQuantityByLedger();
            return res.status(200).send({
              code: 200,
              status: true,
              message: "Add GRN Successfully",
            });
          } catch (error) {
            return res.status(500).send({
              code: 500,
              status: false,
              message: error,
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
  update: async function (req, res) {
    try {
      await wholeSaleLedger.update(req, res);
      const id = req.body.id;
      const detail = req.body.details;
      const updateColumns = req.body;
      delete updateColumns.id;
      delete updateColumns.details;
      const updateSql = `UPDATE wholesale_master SET ${Object.keys(
        updateColumns
      )
        .map((key) => `${key} = ?`)
        .join(", ")} WHERE id = ?`;
      const updateValues = [...Object.values(updateColumns), id];

      await db.query(updateSql, updateValues, async (error, results) => {
        if (error) {
          res.status(500).send({
            code: 500,
            status: false,
            message: error,
          });
        }
        await Promise.all(
          detail.map(async (update) => {
            if (update.id) {
              await db.query(
                `UPDATE wholesale_detail SET itemMaster = ?, itemUOM = ?, itemArticle = ?, itemColor = ?,itemQuantity = ?,itemPrice = ?,itemAmount = ?,itemDelivery = ?,itemNetSalePrice = ?,itemNetAmount = ?,itemImage = ? WHERE id = ?`,
                [
                  update.itemMaster,
                  update.itemUOM,
                  update.itemArticle,
                  update.itemColor,
                  update.itemQuantity,
                  update.itemPrice,
                  update.itemAmount,
                  update.itemDelivery,
                  update.itemNetSalePrice,
                  update.itemNetAmount,
                  update.itemImage,
                  update.id,
                ]
              );
            } else {
              await db.query(
                `INSERT INTO wholesale_detail (masterId,itemMaster,itemUOM,itemArticle,itemColor,itemQuantity,itemPrice,itemAmount,itemDelivery,itemNetSalePrice,itemNetAmount,itemImage) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
                [id,
                  update.itemMaster,
                  update.itemUOM,
                  update.itemArticle,
                  update.itemColor,
                  update.itemQuantity,
                  update.itemPrice,
                  update.itemAmount,
                  update.itemDelivery,
                  update.itemNetSalePrice,
                  update.itemNetAmount,
                  update.itemImage,
                ]
              );
            }
          })
        );
        if (results.affectedRows > 0) {
          updateQuantity.getQuantityByLedger();
          res.status(200).send({
            code: 200,
            status: true,
            message: "Update record successfully",
          });
        } else {
          res.status(206).send({
            code: 206,
            status: false,
            message: "This Id Not Exist!",
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
  delete: async function (req, res) {
    try {
      await wholeSaleLedger.delete(req, res);
      await db.query(
        "DELETE FROM wholesale_master WHERE id = ?",
        [req.body.id],
        async (error, results) => {
          if (error) {
            res.status(500).send({
              code: 500,
              status: false,
              message: error,
            });
          }
          await db.query(
            "DELETE FROM wholesale_detail WHERE masterId = ?",
            [req.body.id],
            (error, allDelete) => {
              if (error) {
                res.status(500).send({
                  code: 500,
                  status: false,
                  message: error,
                });
              }
            }
          );

          if (results.affectedRows > 0) {
            updateQuantity.getQuantityByLedger();
            res.status(200).send({
              code: 200,
              status: true,
              message: "Delete record successfully",
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
  getAll: async function (req, res) {
    try {
      await db.query(
        "SELECT * FROM wholesale_master",
        async (error, results) => {
          if (error) {
            res.status(500).send({
              code: 500,
              status: false,
              message: error,
            });
          } else {
            if (results.length > 0) {
              res.status(200).send({
                code: 200,
                status: true,
                message: "Get all records",
                data: results,
              });
            } else {
              res.status(206).send({
                code: 206,
                status: false,
                message: "Record Not Exist!",
              });
            }
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
  getById: async function (req, res) {
    try {
      await db.query(
        "SELECT * FROM wholesale_master WHERE id = ?",
        [req.body.id],
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
            [req.body.id],
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
  getByCustomer: async function (req, res) {
    try {
      const ledgerAmount = await wholeSaleLedger.ledgerByCustomer(req);
      await db.query(
        "SELECT * FROM wholesale_master WHERE supplierName = ? and supplierNumber = ?",
        [req.body.supplierName, req.body.supplierNumber],
        async (error, results) => {
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
              message: "Get details by customer",
              data: {
                results: results,
                amount: ledgerAmount,
              },
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
      res.status(500).send({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  },
};

module.exports = collection;
