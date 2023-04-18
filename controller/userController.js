const db = require("../config/dbConnection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 12;

const user = {
  checkEmailExist: async function (req, res) {
    try {
      const email = req.body.email;
      await db.query(
        "SELECT COUNT(*) AS count FROM users WHERE email = ?",
        [email],
        (error, results) => {
          const count = results[0].count;
          const emailExists = count === 1;
          res.status(200).send({
            status: true,
            code: 200,
            message: emailExists,
          });
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
  newRegistration: async function (req, res) {
    try {
      const { first_name, last_name, mob, email, password, role } = req.body;
      const encryptedPassword = await bcrypt.hash(password, saltRounds);

      await db.query(
        "SELECT COUNT(*) AS count FROM users WHERE email = ?",
        [email],
        (error, results) => {
          const count = results[0].count;
          if (count > 0) {
            res.status(400).send({
              status: false,
              code: 400,
              message: "Email Already Exist!",
            });
          } else {
            db.query(
              "INSERT INTO users (first_name, last_name, mob, email, password, role, is_active, is_verify) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
              [first_name, last_name, mob, email, encryptedPassword, role, 0, 0]
            );
            res.status(200).send({
              success: true,
              code: 200,
              message: "User registered successfully",
            });
          }
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  },
  loginUser: async function (req, res) {
    try {
      const { email, password } = req.body;
      await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (error, results) => {
          if (error) {
            res.status(500).send({
              code: 500,
              status: false,
              message: error,
            });
          } else {
            if (results.length > 0) {
              const comparison = await bcrypt.compare(
                password,
                results[0].password
              );
              const secretKey =
                "d0a28cb05d1ee1b0a21b14c1e05d12f2075c3f5de5d4a4fb7e2f6b4e6b5b44e3";
              const token = jwt.sign({ id: results[0].id }, secretKey, {
                expiresIn: "24h",
              });
              // console.log('');
              if (comparison) {
                res.status(200).send({
                  code: 200,
                  status: true,
                  message: "login successful",
                  userDetail: { ...results[0], token: token },
                  token: token,
                });
              } else {
                res.status(500).send({
                  code: 206,
                  status: false,
                  message: "Email and password does not match",
                });
              }
            } else {
              res.status(500).send({
                code: 206,
                status: false,
                message: "Email does not exist",
              });
            }
          }
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  },
  userList: async function (req, res) {
    try {
      await db.query("SELECT * FROM users", async (error, results) => {
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
              message: "Get users",
              data: results,
            });
          } else {
            res.status(206).send({
              code: 206,
              status: false,
              message: "Users Not Exist!",
            });
          }
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  },
  updateUser: async function (req, res) {
    try {
    } catch (error) {
      res.status(500).send({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  },
  deleteUser: async function (req, res) {
    try {
    } catch (error) {
      res.status(500).send({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  },
  getUserById: async function (req, res) {
    try {
    } catch (error) {
      res.status(500).send({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  },
};

module.exports = user;
