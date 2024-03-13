const { accessToken, refreshToken } = require("../config/token.config");
const userService = require("../services/user.service");

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await userService.readOneByEmail(email);
      if (user.password !== password)
        throw new Error("not matched user password");
      const payload = {
        uid: user.uid,
        username: user.username,
        email: user.email,
        region: user.region,
        tel: user.tel,
      };
      const issuedAccessToken = await accessToken.generateToken(payload, "30m");
      const issuedRefreshToken = await refreshToken.generateToken(
        payload,
        "90h"
      );

      res.status(201).json({
        accessToken: issuedAccessToken,
        refreshToken: issuedRefreshToken,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
