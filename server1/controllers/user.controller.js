const logger = require("../config/logger.config");
const mailBody = require("../config/mail-body.config");
const passwordEncoder = require("../config/password-encoder.config");
const mailHelper = require("../helpers/mail.helper");
const { User, Profile } = require("../models/user.model");
const userService = require("../services/user.service");

class UserController {
  async create(req, res, next) {
    try {
      //TODO: USER
      const { username, email, password } = req.body;
      //TODO: USER's Profile
      const { birthdate, nationality, region, tel, interests, role } = req.body;
      const encodedPassword = await passwordEncoder.encode(password);
      const newUser = new User(username, email, encodedPassword);
      const newProfile = new Profile(
        birthdate,
        nationality,
        region,
        tel,
        interests,
        role
      );
      await userService.create(newUser, newProfile);

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
      const { uid } = req.user;
      const users = await userService.readProfileByUid(uid);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { uid } = req.query;
      const { birthdate, nationality, region, tel, interests, role } = req.body;
      if (req.user.uid !== Number(uid)) throw new Error("not Matched User");
      const updatedProfiles = new Profile(
        birthdate,
        nationality,
        region,
        tel,
        interests,
        role
      );
      updatedProfiles.setUid(Number(uid));
      await userService.update(updatedProfiles);
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
