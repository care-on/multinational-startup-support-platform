const morgan = require("morgan");
const logger = require("../config/logger.config");

// Morgan 미들웨어 생성 및 설정
const morganMiddleware = morgan("combined", {
  stream: {
    write: (message) => {
      const formattedMessage = message.replace(/\n$/, ""); // 개행 문자 제거
      logger.info(formattedMessage);
    },
  },
});

module.exports = morganMiddleware;
