const db = require("../config/dbConnection");

const collection = {
  create: async function (req, res) {
    try {
      const {
        karigarName,
        karigarMobile,
        karigarDesignation,
        paymentType,
        toDate,
        amount,
        remarks,
      } = req.body;
      await db.query(
        "INSERT INTO karigar_salary ( karigarName, karigarMobile, karigarDesignation,paymentType,toDate,amount,remarks ) VALUES (?,?,?,?,?,?,?)",
        [
          karigarName,
          karigarMobile,
          karigarDesignation,
          paymentType,
          toDate,
          amount,
          remarks,
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
  update: async function (req, res) {
    try {
      const id = req.body.id;
      const updateColumns = req.body;
      delete updateColumns.id;
      const updateSql = `UPDATE karigar_salary SET ${Object.keys(updateColumns)
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
              message: "Update record successfully",
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
        "DELETE FROM karigar_salary WHERE id = ?",
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
      await db.query("SELECT * FROM karigar_salary", async (error, results) => {
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
        "SELECT * FROM karigar_salary WHERE id = ?",
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
                message: "Get details by id",
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