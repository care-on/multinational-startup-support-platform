const answerController = require("../../controllers/answer.controller");
const questionController = require("../../controllers/question.controller");
const guardMiddleware = require("../../middlewares/guard.middleware");

const router = require("express").Router();

/**CRUD QUESTION */
router.post("/", guardMiddleware, questionController.create);
router.get("/", questionController.read);
router.get("/:qid", questionController.readOneByQid);
router.put("/", guardMiddleware, questionController.update);
router.delete("/", guardMiddleware, questionController.delete);

/**CRUD ANSWER */
router.get("/:qid/answer", answerController.read);
router.get("/:qid/answer/:aid");
router.post("/:qid/answer", answerController.create);
router.put("/:qid/answer/:aid", answerController.update);
router.delete("/:qid/answer/:aid", answerController.delete);

module.exports = router;
