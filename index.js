const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use("/api", require("./routes"));

const port = 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
