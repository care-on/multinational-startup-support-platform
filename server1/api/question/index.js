const answerController = require("../../controllers/answer.controller");
const questionController = require("../../controllers/question.controller");
const guardMiddleware = require("../../middlewares/guard.middleware");

const router = require("express").Router();

/**CRUD QUESTION */
/**TODO:consider pagination behavior */
router.post("/", guardMiddleware, questionController.create);
router.get("/", questionController.read);
router.get("/:qid", guardMiddleware, questionController.readOneByQid);
router.post("/:qid/like", guardMiddleware, questionController.like);
router.delete("/:qid/unlike", guardMiddleware, questionController.unLike);

router.put("/", guardMiddleware, questionController.update);
router.delete("/", guardMiddleware, questionController.delete);

/**CUD ANSWER */
router.post("/:qid/answer", guardMiddleware, answerController.create);
router.put("/:qid/answer", guardMiddleware, answerController.update);
router.delete("/:qid/answer", guardMiddleware, answerController.delete);
router.post("/:qid/answer/like", guardMiddleware, answerController.like);
router.delete("/:qid/answer/unlike", guardMiddleware, answerController.unLike);

module.exports = router;
