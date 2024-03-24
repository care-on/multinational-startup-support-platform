const logger = require("../config/logger.config");

module.exports = (err, req, res, next) => {
  logger.error(err.message);
  res.send({ msg: err.message });
};
