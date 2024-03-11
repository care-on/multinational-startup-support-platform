const router = require("express").Router();
const user = require("./user/index");
router.use("/user", user);
module.exports = router;
