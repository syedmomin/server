const db = require("../config/dbConnection");
const customerLedger = require("../controller/customerLedgerController");

const collection = {
  create: async function (req, res) {
    try {
      const {
        customer_name,
        customer_phone,
        order_type,
        item_master,
        previous_balance,
        person_name,
        order_date,
        plan_date,
        actual_date,
        total_amount,
        amount_received,
        balance_amount,
        length,
        shoulder,
        sleeve,
        chest,
        chest_loosing,
        middle,
        middle_loosing,
        west,
        west_loosing,
        hip,
        hip_loosing,
        daman,
        daman_loosing,
        daman_type,
        cuff_type,
        cuff_type_size,
        collar,
        collar_type,
        collar_type_size,
        placket_type,
        placket_type_size,
        front_pocket,
        side_pocket,
        right_length,
        right_west,
        right_hip,
        thai,
        knee,
        calf,
        bottom,
        rightZip,
        note,
        details,
      } = req.body;
      await db.query(
        "INSERT INTO order_master (customer_name,customer_phone,order_type,item_master,previous_balance,person_name,order_date,plan_date,actual_date,total_amount,amount_received,balance_amount,length,shoulder,sleeve,chest,chest_loosing,middle,middle_loosing,west,west_loosing,hip,hip_loosing,daman,daman_loosing,daman_type,cuff_type,cuff_type_size,collar,collar_type,collar_type_size,placket_type,placket_type_size,front_pocket,side_pocket,right_length,right_west,right_hip,thai,knee,calf,bottom,rightZip,note) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          customer_name,
          customer_phone,
          order_type,
          item_master,
          previous_balance,
          person_name,
          order_date,
          plan_date,
          actual_date,
          total_amount,
          amount_received,
          balance_amount,
          length,
          shoulder,
          sleeve,
          chest,
          chest_loosing,
          middle,
          middle_loosing,
          west,
          west_loosing,
          hip,
          hip_loosing,
          daman,
          daman_loosing,
          daman_type,
          cuff_type,
          cuff_type_size,
          collar,
          collar_type,
          collar_type_size,
          placket_type,
          placket_type_size,
          front_pocket,
          side_pocket,
          right_length,
          right_west,
          right_hip,
          thai,
          knee,
          calf,
          bottom,
          rightZip,
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
          // console.log("results", results);
          await customerLedger.create(req, res);
          const orderId = results.insertId;
          try {
            await Promise.all(
              details.map(async (detail) => {
                await db.query(
                  "INSERT INTO order_detail (master_id, stich_type, quantity, price, amount, note, imageName) VALUES (?,?,?,?,?,?,?)",
                  [
                    orderId,
                    detail.itemName,
                    detail.itemQuantity,
                    detail.itemPrice,
                    detail.itemAmount,
                    detail.itemNote,
                    detail.itemImage,
                  ]
                );
              })
            );

            return res.status(200).send({
              code: 200,
              status: true,
              message: "Add Order Invoice Successfully",
              data: orderId,
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
      await customerLedger.update(req, res);
      const id = req.body.id;
      const detail = req.body.details;
      const updateColumns = req.body;
      delete updateColumns.id;
      delete updateColumns.details;
      const updateSql = `UPDATE order_master SET ${Object.keys(updateColumns)
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
            await db.query(
              "DELETE FROM order_detail WHERE master_id = ?",
              [id],
              async (error, results) => {
                if (error) {
                  res.status(500).send({
                    code: 500,
                    status: false,
                    message: error,
                  });
                }
              }
            )
            await db.query(
              "INSERT INTO order_detail (master_id, stich_type, quantity, price, amount, note, imageName) VALUES (?,?,?,?,?,?,?)",
              [
                id,
                detail.itemName,
                detail.itemQuantity,
                detail.itemPrice,
                detail.itemAmount,
                detail.itemNote,
                detail.itemImage,
              ]
            )
          })
        );
        if (results.affectedRows > 0) {
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
      await customerLedger.delete(req, res);
      const { id, customer_name, customer_phone } = req.body;
      await db.query(
        "DELETE FROM order_master WHERE id = ?",
        [id],
        async (error, results) => {
          if (error) {
            res.status(500).send({
              code: 500,
              status: false,
              message: error,
            });
          }
          await db.query(
            "DELETE FROM order_detail WHERE master_id = ?",
            [id],
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
          // await db.query(
          //   "SELECT COUNT(*) AS count FROM order_master WHERE customer_phone = ? and customer_name = ?",
          //   [customer_phone, customer_name],
          //   async (error, checkCount) => {
          //     const count = checkCount[0].count;
          //     if (count === 0) {
          //       await db.query(
          //         "DELETE FROM customer_ledger WHERE customer_phone = ? and customer_name = ?",
          //         [customer_phone, customer_name]
          //       );
          //     }
          //   }
          // );
          if (results.affectedRows > 0) {
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
      await db.query("SELECT * FROM order_master", async (error, results) => {
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
        "SELECT * FROM order_master WHERE id = ?",
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
            "SELECT * FROM order_detail WHERE master_id = ?",
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
      const ledgerAmount = await customerLedger.ledgerByCustomer(req);
      await db.query(
        "SELECT * FROM order_master WHERE customer_name = ? and customer_phone = ?",
        [req.body.customer_name, req.body.customer_phone],
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

  customerLastRecord: async function (req, res) {
    try {
      const customerName = req.body.customer_name;
      const personName = req.body.person_name;
      await db.query(
        "SELECT * FROM order_master WHERE customer_name = ? and person_name = ? ORDER BY id DESC LIMIT 1",
        [customerName, personName],
        async (error, results) => {
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
              message: "Get details by Last Order",
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

module.exports = collection;
