const express = require("express");
const db = require("./src/config/db");
const { join } = require("path");


const app = express();
require('dotenv').config();
const cors = require("cors");

const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ limit: '400mb', extended: false }));
app.use(express.json({ limit: '400mb' }));

app.use(express.static(join(__dirname, "/public/")));

// app.use(router);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});