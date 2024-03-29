const cardNewsController = require("../../controllers/card-news.controller");
const guardMiddleware = require("../../middlewares/guard.middleware");

const router = require("express").Router();

router.get("/", cardNewsController.read);
router.get("/:cid", guardMiddleware, cardNewsController.readOneByCid);
router.post("/:cid/like", guardMiddleware, cardNewsController.like);
router.delete("/:cid/like", guardMiddleware, cardNewsController.unLike);

module.exports = router;
