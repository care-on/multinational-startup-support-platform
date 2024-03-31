const morgan = require("morgan");
const logger = require("../config/logger.config");

// Morgan �̵���� ���� �� ����
const morganMiddleware = morgan("combined", {
  stream: {
    write: (message) => {
      const formattedMessage = message.replace(/\n$/, ""); // ���� ���� ����
      logger.info(formattedMessage);
    },
  },
});

module.exports = morganMiddleware;
