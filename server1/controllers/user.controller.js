const logger = require("../config/logger.config");
const mailBody = require("../config/mail-body.config");
const passwordEncoder = require("../config/password-encoder.config");
const mailHelper = require("../helpers/mail.helper");
const User = require("../models/user.model");
const userService = require("../services/user.service");

class UserController {
  async create(req, res, next) {
    try {
      const { username, email, password, region, tel } = req.body;
      const encodedPassword = await passwordEncoder.encode(password);
      const newUser = new User(username, email, encodedPassword, region, tel);
      userService.create(newUser);
      // mailHelper.send(
      //   email,
      //   mailBody.welcome.subject(username),
      //   mailBody.welcome.html(username)
      // );
      res.status(201).json({ message: "User created successfully." });
    } catch (error) {
      next(error);
    }
  }

  async read(req, res, next) {
    try {
      const users = await userService.read();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { uid } = req.query;
      const { username, email, password, region, tel } = req.body;
      const newUser = new User(username, email, password, region, tel);

      if (req.user.uid !== Number(uid)) throw new Error("not Matched User");
      userService.update({ uid: Number(uid), ...newUser });
      res.status(201).json({ message: "User updated successfully." });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { uid } = req.query;
      if (req.user.uid !== Number(uid)) throw new Error("not Matched User");

      userService.delete(Number(uid));
      res.status(201).json({ message: "User deleted successfully." });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
