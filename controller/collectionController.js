const db = require("../config/dbConnection");

const user = {
    create: async function (req, res) {
        try {
            const { image, name, description } = req.body;
            await db.query(
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
        } catch (error) {
            res.status(500).send({
                status: false,
                code: 500,
                message: error.message,
            });
        }
    }
}

module.exports = user;