const articleController = require("../../controllers/article.controller");
const guardMiddleware = require("../../middlewares/guard.middleware");

const router = require("express").Router();

router.get("/", articleController.read);
router.get("/:aid", guardMiddleware, articleController.readOneByAid);
router.post("/:aid/like", guardMiddleware, articleController.like);
router.delete("/:aid/like", guardMiddleware, articleController.unLike);

module.exports = router;
