const db = require("../config/dbConnection");

const collection = {
    create: async function (req, res) {
        try {
            const { image, name, description } = req.body;
            await db.query(
                "SELECT COUNT(*) AS count FROM collection WHERE name = ?",
                [name],
                (error, results) => {
                    const count = results[0].count;
                    if (count > 0) {
                        res.status(400).send({
                            status: false,
                            code: 400,
                            message: "This name already Exist!",
                        });
                    } else {
                        db.query(
                            "INSERT INTO collection (image,name,description,status) VALUES (?, ?, ?, ?)",
                            [image, name, description, 1],
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
        try {
            await db.query(
                "SELECT COUNT(*) AS count FROM collection WHERE name = ?",
                [req.body.name],
                async (error, results) => {
                    const count = results[0].count;
                    if (count > 0) {
                        res.status(400).send({
                            status: false,
                            code: 400,
                            message: "This name already Exist!",
                        });
                    } else {

                        const id = req.body.id;
                        const updateColumns = req.body;
                        delete updateColumns.id;
                        const updateSql = `UPDATE collection SET ${Object.keys(updateColumns).map(key => `${key} = ?`).join(', ')} WHERE id = ?`;
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
                                        message: "Update Collection Succssfully",
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

module.exports = collection;


