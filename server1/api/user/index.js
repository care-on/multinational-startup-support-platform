const userController = require("../../controllers/user.controller");
const guardMiddleware = require("../../middlewares/guard.middleware");

const router = require("express").Router();
/**CRUD USER */
router.post("/", userController.create);
router.get("/", userController.read);
router.put("/", guardMiddleware, userController.update);
router.delete("/", guardMiddleware, userController.delete);
module.exports = router;
