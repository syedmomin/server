const jwt = require("jsonwebtoken");
const secretKey = 'd0a28cb05d1ee1b0a21b14c1e05d12f2075c3f5de5d4a4fb7e2f6b4e6b5b44e3';

const verifyToken = async (req, res, next) => {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
        req.token = req.headers.authorization.split(' ')[1];
        try {
            var verifytoken = await jwt.verify(req.token, secretKey);
            if (verifytoken) {
                next();
            }
        } catch (error) {
            res
                .status(401)
                .send({ status: false, code: 401, message: error });
        }
    } else {
        res.status(404).send({ status: false, message: "Token not found" });
    }
};
const verifyKey = async (req, res, next) => {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
        req.token = req.headers.authorization.split(' ')[1];
        try {
            var verifytoken = await jwt.verify(req.token, secretKey);
            if (verifytoken) {
                res
                    .status(200)
                    .send({ status: true, code: 200, message: "Authorized" });
            }
        } catch (error) {
            res
                .status(401)
                .send({ status: false, code: 401, message: "Unauthorized" });
        }
    } else {
        res.status(404).send({ status: false, message: "Token not found" });
    }
};
module.exports = { verifyToken, verifyKey };
