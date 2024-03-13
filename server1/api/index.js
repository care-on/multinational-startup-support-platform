const router = require("express").Router();
const user = require("./user/index");
const question = require("./question/index");
const auth = require("./auth/index");
router.use("/user", user);
router.use("/question", question);
router.use("/auth", auth);
module.exports = router;
