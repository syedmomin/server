const db = require("../config/dbConnection");

const product = {
    create: async function (req, res) {
        try {
            const { product_name, product_description, product_image, product_price, product_brand, product_color, product_size, collection_id } = req.body;
            await db.query(
                "SELECT COUNT(*) AS count FROM product WHERE product_name = ?",
                [product_name],
                (error, results) => {
                    const count = results[0].count;
                    if (count > 0) {
                        res.status(400).send({
                            status: false,
                            code: 400,
                            message: "This product already Exist!",
                        });
                    } else {
                        db.query(
                            "INSERT INTO product (product_name, product_description, product_image, product_price, product_brand, product_color, product_size, collection_id ) VALUES (?, ?, ?, ?,?,?,?,?)",
                            [product_name, product_description, product_image, product_price, product_brand, product_color, product_size, collection_id],
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
                                        message: "Create Collection Successfully",
                                        data: results[0],
                                    });
                                }
                            })
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
    update: async function (req, res) {
        try { } catch (error) {
            res.status(500).send({
                status: false,
                code: 500,
                message: error.message,
            });
        }
    },
    delete: async function (req, res) {
        try {
            await db.query("DELETE FROM collection WHERE id = ?",
                [req.body.id], async (error, results) => {
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
                                message: "Delete Collection Succssfully",
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
    getAll: async function (req, res) {
        try {
            await db.query("SELECT * FROM collection", async (error, results) => {
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
                            message: "Get all collection",
                            data: results,
                        });
                    } else {
                        res.status(206).send({
                            code: 206,
                            status: false,
                            message: "Collection Not Exist!",
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
            await db.query("SELECT * FROM collection WHERE id = ?",
                [req.body.id], async (error, results) => {
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
                                message: "Get Collection",
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
                });
        } catch (error) {
            res.status(500).send({
                status: false,
                code: 500,
                message: error.message,
            });
        }
    },

}

module.exports = product;