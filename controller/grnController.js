const db = require("../config/dbConnection");
const updateQuantity = require("./itemMasterController");
const collection = {
  create: async function (req, res) {
    try {
      const {
        transactionDate,
        receivingDate,
        supplierName,
        supplierNumber,
        totalShipmentCost,
        totalMiscCost,
        totalCost,
        totalNetAmount,
        note,
        details,
      } = req.body;

      await db.query(
        "INSERT INTO grn_master (transactionDate,receivingDate,supplierName,supplierNumber,totalShipmentCost,totalMiscCost,totalCost,totalNetAmount,note) VALUES (?,?,?,?,?,?,?,?,?)",
        [
          transactionDate,
          receivingDate,
          supplierName,
          supplierNumber,
          totalShipmentCost,
          totalMiscCost,
          totalCost,
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
          const masterId = results.insertId;
          try {
            await Promise.all(
              details.map(async (detail) => {
                await db.query(
                  "INSERT INTO grn_detail (masterId,itemMaster,itemUOM,itemArticle,itemColor,itemQuantity,itemRate,itemAmount,itemShipment,itemMiscCost,itemNetRate,itemNetAmount,itemImage) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                  [
                    masterId,
                    detail.itemMaster,
                    detail.itemUOM,
                    detail.itemArticle,
                    detail.itemColor,
                    detail.itemQuantity,
                    detail.itemRate,
                    detail.itemAmount,
                    detail.itemShipment,
                    detail.itemMiscCost,
                    detail.itemNetRate,
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
      const id = req.body.id;
      const detail = req.body.details;
      const updateColumns = req.body;
      delete updateColumns.id;
      delete updateColumns.details;
      const updateSql = `UPDATE grn_master SET ${Object.keys(updateColumns)
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
                `UPDATE grn_detail SET itemMaster = ?, itemUOM = ?, itemArticle = ?, itemColor = ?,itemQuantity = ?,itemRate = ?,itemAmount = ?,itemShipment = ?,itemMiscCost = ?,itemNetRate = ?,itemNetAmount = ?,itemImage = ? WHERE id = ?`,
                [
                  update.itemMaster,
                  update.itemUOM,
                  update.itemArticle,
                  update.itemColor,
                  update.itemQuantity,
                  update.itemRate,
                  update.itemAmount,
                  update.itemShipment,
                  update.itemMiscCost,
                  update.itemNetRate,
                  update.itemNetAmount,
                  update.itemImage,
                  update.id,
                ]
              );
            } else {
              await db.query(
                `INSERT INTO grn_detail (masterId,itemMaster, itemUOM, itemArticle, itemColor, itemQuantity, itemRate, itemAmount, itemShipment, itemMiscCost, itemNetRate, itemNetAmount, itemImage) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [id,
                  update.itemMaster,
                  update.itemUOM,
                  update.itemArticle,
                  update.itemColor,
                  update.itemQuantity,
                  update.itemRate,
                  update.itemAmount,
                  update.itemShipment,
                  update.itemMiscCost,
                  update.itemNetRate,
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
      await db.query(
        "DELETE FROM grn_master WHERE id = ?",
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
            "DELETE FROM grn_detail WHERE masterId = ?",
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
      await db.query("SELECT * FROM grn_master", async (error, results) => {
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
      });
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
        "SELECT * FROM grn_master WHERE id = ?",
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
            "SELECT * FROM grn_detail WHERE masterId = ?",
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
};

module.exports = collection;
