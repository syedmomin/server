const db = require("../config/dbConnection");

const collection = {
  create: async function (req, res) {
    try {
      const {
        full_name,
        email,
        phone,
        address,
        alternateNumber,
        city,
        country,
        customerType,
      } = req.body;
      await db.query(
        "SELECT COUNT(*) AS count FROM customer WHERE phone = ?",
        [phone],
        (error, results) => {
          const count = results[0].count;
          if (count > 0) {
            res.status(400).send({
              status: false,
              code: 400,
              message: "This Customer Already Exist!",
            });
          } else {
            db.query(
              "INSERT INTO customer (full_name, email, phone,alternate_number,country,city,customer_type,address) VALUES (?,?,?,?,?,?,?,?)",
              [
                full_name,
                email,
                phone,
                alternateNumber,
                country,
                city,
                customerType,
                address,
              ],
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
                    message: "Add customer Successfully",
                    data: results[0],
                  });
                }
              }
            );
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
      const updateColumns = req.body;
      delete updateColumns.id;
      const updateSql = `UPDATE customer SET ${Object.keys(updateColumns)
        .map((key) => `${key} = ?`)
        .join(", ")} WHERE id = ?`;
      const updateValues = [...Object.values(updateColumns), id];

      await db.query(updateSql, updateValues, (error, results) => {
        if (error) {
          res.status(500).send({
            code: 500,
            status: false,
            message: error,
          });
        } else {
          if (results.affectedRows > 0) {
            res.status(200).send({
              code: 200,
              status: true,
              message: "Update customer Successfully",
            });
          } else {
            res.status(206).send({
              code: 206,
              status: false,
              message: "This Id Not Exist!",
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
  delete: async function (req, res) {
    try {
      await db.query(
        "DELETE FROM customer WHERE id = ?",
        [req.body.id],
        async (error, results) => {
          if (error) {
            res.status(500).send({
              code: 500,
              status: false,
              message: error,
            });
          } else {
            if (results.affectedRows > 0) {
              res.status(200).send({
                code: 200,
                status: true,
                message: "Delete customer Successfully",
              });
            } else {
              res.status(206).send({
                code: 206,
                status: false,
                message: "This Id Not Exist!",
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
  getAll: async function (req, res) {
    try {
      await db.query("SELECT * FROM customer", async (error, results) => {
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
              message: "Get all customer",
              data: results,
            });
          } else {
            res.status(206).send({
              code: 206,
              status: false,
              message: "customer Not Exist!",
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
        "SELECT * FROM customer WHERE id = ?",
        [req.body.id],
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
                message: "Get customer",
                data: results[0],
              });
            } else {
              res.status(206).send({
                code: 206,
                status: false,
                message: "This Id Not Exist!",
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
};

module.exports = collection;
