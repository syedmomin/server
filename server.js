const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 8080;
const corsOption = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    exposedHeaders: [
        "Authorization",
        "Content-Type",
        "x-auth-token",
        "authorization",
    ],
    credentials: true,
};

const app = express()
app.use(cors(corsOption));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("./routes/indexRoute"));

const dirname = path.resolve();
app.use('/', express.static(path.join(dirname, './website')))
app.use('*', express.static(path.join(dirname, './website')))

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});