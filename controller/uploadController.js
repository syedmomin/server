const fs = require("fs");

const uploadFile = {
  assetsImage: async function (req, res) {
    try {
      const path = `./assets/images/${req.body.filePath}${req.body.imageName}`;
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
};

module.exports = uploadFile;

// CREATE TABLE `product` (
//     `id` int(11) NOT NULL,
//     `product_name` varchar(300) NOT NULL,
//     `product_description` text NOT NULL,
//     `product_image` varchar(300) NOT NULL,
//     `product_price` varchar(100) NOT NULL,
//     `product_brand` varchar(200) NOT NULL,
//     `product_color` varchar(500) NOT NULL,
//     `product_size` varchar(500) NOT NULL,
//     `collection_name` varchar(50) NOT NULL,
//     `product_status` tinyint(1) NOT NULL DEFAULT 1,
//     `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
