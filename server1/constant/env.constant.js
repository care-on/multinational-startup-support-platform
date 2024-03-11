require("dotenv").config();

module.exports = {
  /**@param DB (HOST, PORT, NAME, USER, PASSWORD) this is configuration about aws rds */
  DB: {
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    NAME: process.env.DB_NAME,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
  },
};
