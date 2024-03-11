const { TOKEN } = require("../constant/env.constant");
const Token = require("../helpers/token.helper");

module.exports = {
  accessToken: new Token(TOKEN.ACCESS_SECRET),
  refreshToken: new Token(TOKEN.REFRESH_SECRET),
};
