const db = require('../config/dbConnection');

const user = {
    newRegistration: async function (req, res) {
        try {
            const { first_name, last_name, mob, email, password, confirm_password, role } = req.body;
            const results = db.query(`SELECT COUNT(*) AS count FROM users WHERE email='${email}'`);
            console.log('sds', results);
            if (results > 0) {
                res.status(400).send({
                    status: false,
                    code: 400,
                    message: "Email already exists",
                });
            } else {
                await db.query(
                    'INSERT INTO users (first_name, last_name, mob, email, password, confirm_password, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [first_name, last_name, mob, email, password, confirm_password, role]
                );
                res.status(200).send({
                    status: true,
                    code: 200,
                    message: "Success",
                });
            }
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

        } catch (error) {
            console.error(error);
            res.status(500).send({
                status: false,
                code: 500,
                message: error.message,
            });
        }
    }
};

module.exports = user;
