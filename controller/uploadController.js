const fs = require('fs');

const uploadFile = {
    collectionImage: async function (req, res) {
        try {
            const path = `./dist/assets/images/${req.body.filePath}${Date.now()}.png`;
            const imgdata = req.body.file;
            const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
            fs.writeFileSync(path, base64Data, { encoding: 'base64' });

            return res.send({
                code: 200,
                status: true,
                message: "File is uploaded!",
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

module.exports = uploadFile;