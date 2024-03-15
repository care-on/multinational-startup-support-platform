const crypto = require("bcrypt");
class PasswordEncoder {
  constructor(saltRounds) {
    this.saltRound = saltRounds;
    this.initialize();
  }

  async initialize() {
    try {
      this.salt = await crypto.genSaltSync(this.saltRounds);
    } catch (err) {
      throw err;
    }
  }
  async encode(plainText) {
    try {
      return crypto.hashSync(plainText, this.salt);
    } catch (err) {
      throw err;
    }
  }
  async compare(plainText, encodedText) {
    try {
      const isSame = await crypto.compareSync(plainText, encodedText);
      return isSame;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = PasswordEncoder;
