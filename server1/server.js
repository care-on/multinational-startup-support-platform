const express = require("express");
const { connection } = require("./config/db.config");
const app = express();
const port = process.env.SERVER_PORT || 8000;
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
