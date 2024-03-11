const { connection_pool } = require("../config/db.config");
class UserService {
  constructor() {
    this.users = [];
    this.initializeUsers();
  }
  async initializeUsers() {
    try {
      const [rows, fields] = await connection_pool.query("SELECT * FROM users");
      this.users = rows; // 데이터베이스에서 가져온 사용자 목록을 할당
    } catch (err) {
      throw err;
    }
  }
  async create(newUser) {
    try {
      const result = await connection_pool.query(
        "INSERT INTO users SET ?",
        newUser
      );
      const [rows, fields] = await connection_pool.query(
        "SELECT * FROM users WHERE uid = ?",
        [result[0].insertId]
      );
      this.users.push(rows[0]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }
  async read() {
    try {
      return this.users;
    } catch (err) {
      throw err;
    }
  }

  async update(updatedUser) {
    try {
      const result = await connection_pool.query(
        "UPDATE users SET ? WHERE uid = ?",
        [updatedUser, updatedUser.uid]
      );
      if (result[0].affectedRows > 0) {
        const [updatedUserData] = await connection_pool.query(
          "SELECT * FROM users WHERE uid = ?",
          [updatedUser.uid]
        );
        const userIndex = this.users.findIndex(
          (user) => user.uid === updatedUser.uid
        );
        this.users[userIndex] = updatedUserData[0];
        return updatedUserData[0];
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      throw err;
    }
  }

  async delete(uid) {
    try {
      const result = await connection_pool.query(
        "DELETE FROM users WHERE uid = ?",
        [uid]
      );
      if (result[0].affectedRows > 0) {
        const deletedUser = this.users.find((user) => user.uid === uid);
        this.users = this.users.filter((user) => user.uid !== uid);
        return deletedUser;
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new UserService();
