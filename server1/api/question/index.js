const answerController = require("../../controllers/answer.controller");
const questionController = require("../../controllers/question.controller");
const guardMiddleware = require("../../middlewares/guard.middleware");

const router = require("express").Router();

/**CRUD QUESTION */
router.post("/", guardMiddleware, questionController.create);
router.get("/", questionController.read);
router.get("/:qid", guardMiddleware, questionController.readOneByQid);
router.put("/", guardMiddleware, questionController.update);
router.delete("/", guardMiddleware, questionController.delete);

/**CUD ANSWER */
router.post("/:qid/answer", guardMiddleware, answerController.create);
router.put("/:qid/answer", guardMiddleware, answerController.update);
router.delete("/:qid/answer", guardMiddleware, answerController.delete);

module.exports = router;
