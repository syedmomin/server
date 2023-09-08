const fs = require("fs");

const uploadFile = {
  assetsImage: async function (req, res) {
    try {
      const path = `./website/assets/images/${req.body.filePath}${req.body.imageName}`;
      const imgdata = req.body.file;
      const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, "");
      fs.writeFileSync(path, base64Data, { encoding: "base64" });

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
  multiImage: async function (req, res) {
    try {
      const uploadedFiles = req.body;
      if (!uploadedFiles || uploadedFiles.length === 0) {
        return res.status(400).json({ message: "No files were uploaded." });
      }

      uploadedFiles.file.forEach((file, index) => {
        const filePath = `./website/assets/images/order/${req.body.imageName[index]}`;
        const base64Data = file.replace(/^data:([A-Za-z-+/]+);base64,/, "");
        fs.writeFileSync(filePath, base64Data, { encoding: "base64" });
      });
      return res.status(200).json({
        code: 200,
        status: true,
        message: "Files are uploaded successfully!",
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  },
};

module.exports = uploadFile;
