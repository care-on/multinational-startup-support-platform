const { MAIL } = require("../constant/env.constant");

module.exports = {
  transporterConfig: {
    service: MAIL.SERVICE,
    host: MAIL.HOST,
    auth: {
      user: MAIL.AUTH.USER,
      pass: MAIL.AUTH.PASSWORD,
    },
  },
};
