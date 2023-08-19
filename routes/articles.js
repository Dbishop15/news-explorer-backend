const router = require("express").Router();

const auth = require("../middlewares/auth");

const {
  addArticle,
  getArticles,
  removeArticle,
} = require("../controllers/articles");

const {
  validateArticleId,
  validateArticleInfoBody,
} = require("../middlewares/validation");

router.get("/", getArticles);
router.post("/", auth.handleAutError, validateArticleInfoBody, addArticle);

router.delete(
  "/:articleId",
  auth.handleAutError,
  validateArticleId,
  removeArticle
);

module.exports = router;
