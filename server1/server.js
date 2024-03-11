const express = require("express");
const { connection } = require("./config/db.config");
const app = express();
const port = process.env.SERVER_PORT || 8000;
const apiIndex = require("./api/index");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**@ROUTER router render point */
app.use("/api", apiIndex);

/**@TEST DB connection TEST */
connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("successful");
  }
});
app.listen(port, () => {
  console.log("server open!");
});
