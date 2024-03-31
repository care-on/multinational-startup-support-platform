const { connection_pool, connection } = require("../config/db.config");
const logger = require("../config/logger.config");
class UserService {
  constructor() {
    this.users = [];
    this.initializeUsers();
  }
  async initializeUsers() {
    try {
      const [rows, fields] = await connection_pool.query(
        "SELECT * FROM users where leavedate is NULL"
      );
      this.users = rows; // ï¿½ï¿½ï¿½ï¿½ï¿½Íºï¿½ï¿½Ì½ï¿½ï¿½ï¿½ï¿½ï¿½ ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ ï¿½ï¿½ï¿½ï¿½ï¿? ï¿½ï¿½ï¿½ï¿½ï¿? ï¿½Ò´ï¿½
    } catch (err) {
      throw err;
    }
  }
  async create(newUser, newProfile) {
    try {
      const connection = await connection_pool.getConnection();
      await connection.beginTransaction();
      const result = await connection.query("INSERT INTO users SET ?", newUser);
      newProfile.setUid(result[0].insertId);
      await connection.query("INsert INTO profiles SET ?", newProfile);
      const [rows, fields] = await connection.query(
        "SELECT * FROM users WHERE uid = ?",
        [result[0].insertId]
      );
      await connection.commit();
      connection.release();
      this.users.push(rows[0]);
      return rows[0];
    } catch (err) {
      await connection.rollback();
      connection.release();
      throw err;
    }
  }
  async readProfileByUid(uid) {
    try {
      const connection = await connection_pool.getConnection();
      const [rows, fields] = await connection.query(
        "select u.uid, username,email, password, joindate,birthdate, nationality, region, tel, interests, role  from users u, profiles p where u.uid = p.uid and u.uid=?",
        [uid]
      );
      connection.release();
      if (rows.length === 0)
        return {
          err_code: -1,
          msg: "cannot found User",
        };
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async readOneByEmail(email) {
    try {
      const user = this.users.find((user) => user.email === email);
      if (user) {
        return user;
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      throw err;
    }
  }

  async update(updatedUser) {
    try {
      const connection = await connection_pool.getConnection();
      await connection.beginTransaction();
      const result = await connection.query(
        "UPDATE profiles SET ? WHERE uid = ?",
        [updatedUser, updatedUser.uid]
      );
      if (result[0].affectedRows <= 0) throw new Error("User not found");

      await connection.commit();
      connection.release();
    } catch (err) {
      await connection.rollback();
      connection.release();
      throw err;
    }
  }

  async delete(uid) {
    try {
      const result = await connection_pool.query(
        "UPDATE users SET leavedate = CURRENT_TIMESTAMP WHERE uid = ?",
        [uid]
      );
      console.log(result);
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
