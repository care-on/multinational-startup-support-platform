const questionController = require("../../controllers/question.controller");

const router = require("express").Router();

/**CRUD QUESTION */
router.post("/", questionController.create);
router.get("/", questionController.read);
router.put("/", questionController.update);
router.delete("/", questionController.delete);
module.exports = router;
