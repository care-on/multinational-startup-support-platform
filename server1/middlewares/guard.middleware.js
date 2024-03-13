const { accessToken } = require("../config/token.config");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]
      ? req.headers["authorization"].split(" ")
      : null;
    if (!token) throw new Error("token isn't exist");
    if (token[0] != "Bearer") throw new Error("invalid Token");
    await accessToken.verifyToken(token[1]);
    const payload = await accessToken.decodeToken(token[1]);
    req.user = payload;
    console.log(req.user);
    next();
  } catch (e) {
    next(e);
  }
};
