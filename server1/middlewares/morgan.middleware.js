const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const logger = require("../config/logger.config");

// 로그를 저장할 디렉토리 경로 설정
const logDirectory = path.join(__dirname, "..", "logs");

// logs 디렉토리가 존재하지 않으면 생성
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Morgan 미들웨어 생성 및 설정
const morganMiddleware = morgan("combined", {
  stream: fs.createWriteStream(path.join(logDirectory, "access.log"), {
    flags: "a",
  }),
});

module.exports = morganMiddleware;
