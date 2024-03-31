const express = require("express");
const { connection } = require("./config/db.config");
const app = express();
const port = process.env.SERVER_PORT || 8000;
const apiIndex = require("./api/index");
const errorMiddleware = require("./middlewares/error.middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");
const cors = require("cors");
const morganMiddleware = require("./middlewares/morgan.middleware");
const logger = require("./config/logger.config");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morganMiddleware);
/**@ROUTER router render point */
app.use("/api", apiIndex);

app.use("/api", errorMiddleware);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));
/**@TEST DB connection TEST */
connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    logger.info("successfully connect db connection pool .. !");
  }
});
app.listen(port, () => {
  logger.info("server open!");
});
