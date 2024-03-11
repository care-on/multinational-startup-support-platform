const userController = require("../../controllers/user.controller");

const router = require("express").Router();
/**CRUD USER */
router.post("/", userController.create);
router.get("/", userController.read);
router.put("/", userController.update);
router.delete("/", userController.delete);
module.exports = router;
