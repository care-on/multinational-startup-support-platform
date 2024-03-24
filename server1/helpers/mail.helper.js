const nodemailer = require("nodemailer");
const { transporterConfig } = require("../config/transporter.config");
/**
 * 가입, 인증 메일, 아이디 비밀번호 찾기에서 사용
 */
class Mail {
  constructor(transporterConfig) {
    this.transporter = nodemailer.createTransport(transporterConfig);
    this.from = transporterConfig.auth.user;
  }
  async send(target, subject, html) {
    try {
      const rs = await this.transporter.sendMail({
        from: this.from,
        to: target,
        subject: subject,
        html: html,
      });
      return rs;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new Mail(transporterConfig);
