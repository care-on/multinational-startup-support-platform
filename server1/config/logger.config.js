const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, colorize } = format;

const logger = createLogger({
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    label({ label: "care-on service" }),
    printf((info) => {
      let level = info.level.toUpperCase();
      let message = `[${info.timestamp}] [${info.label}] ${level}: ${info.message}`;
      if (info.level === "error") {
        message = `\x1b[31m${message}\x1b[0m`; // 빨간색
      } else if (info.level === "warn") {
        message = `\x1b[33m${message}\x1b[0m`; // 노란색
      } else if (info.level === "info") {
        message = `\x1b[36m${message}\x1b[0m`; // 청록색
      } else if (info.level === "debug") {
        message = `\x1b[35m${message}\x1b[0m`; // 자홍색
      } else if (info.level === "verbose") {
        message = `\x1b[32m${message}\x1b[0m`; // 초록색
      }
      return message;
    })
  ),
  transports: [new transports.Console()],
});

module.exports = logger;
