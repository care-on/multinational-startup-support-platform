const questionController = require("../../controllers/question.controller");
const guardMiddleware = require("../../middlewares/guard.middleware");

const router = require("express").Router();

/**CRUD QUESTION */
router.post("/", guardMiddleware, questionController.create);
router.get("/", questionController.read);
router.put("/", guardMiddleware, questionController.update);
router.delete("/", guardMiddleware, questionController.delete);
module.exports = router;
