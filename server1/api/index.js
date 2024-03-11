const router = require("express").Router();
const user = require("./user/index");
const question = require("./question/index");
router.use("/user", user);
router.use("/question", question);
module.exports = router;
