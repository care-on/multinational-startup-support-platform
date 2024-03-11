const User = require("../models/user.model");
const userService = require("../services/user.service");

class UserController {
  async create(req, res, next) {
    try {
      const { username, email, password, region, tel } = req.body;
      const newUser = new User(username, email, password, region, tel);
      userService.create(newUser);
      res.status(201).json({ message: "User created successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
    }
  }

  async read(req, res, next) {
    try {
      const users = await userService.read();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
    }
  }

  async update(req, res, next) {
    try {
      const { uid } = req.query;
      const { username, email, password, region, tel } = req.body;
      const newUser = new User(username, email, password, region, tel);
      userService.update({ uid: uid, ...newUser });
      res.status(201).json({ message: "User updated successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
    }
  }

  async delete(req, res, next) {
    try {
      const { uid } = req.query;
      userService.delete(uid);
      res.status(201).json({ message: "User deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
}

module.exports = new UserController();
