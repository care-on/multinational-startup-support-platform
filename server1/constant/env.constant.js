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
  TOKEN: {
    ACCESS_SECRET: process.env.ACCESS_SECRET,
    REFRESH_SECRET: process.env.REFRESH_SECRET,
  },
  MAIL: {
    SERVICE: process.env.MAIL_SERVICE,
    HOST: process.env.MAIL_HOST,
    PORT: process.env.MAIL_PORT,
    AUTH: {
      USER: process.env.MAIL_AUTH_USER,
      PASSWORD: process.env.MAIL_AUTH_PASSWORD,
    },
  },
};
