const Article = require("../models/article");
const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");
const article = require("../models/article");

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user?._id })
    .then((data) => res.send(data))
    .catch(next);
};

const addArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => {
      res.send({ data: article });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data provided"));
      } else {
        next(err);
      }
    });
};

const removeArticle = (req, res, next) => {
  const { articleId } = req.params;
  Article.findById(req.params.articleId)
    .then((article) => {
      if (!article) {
        return next(new NotFoundError("Article not found"));
      }
      if (!article.owner.toString() === req.user._id) {
        return next(
          new ForbiddenError("User not authorized to delete article")
        );
      }
      return Article.findByIdAndDelete(article._id)
        .then(() => {
          res.send({ data: article });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data provided"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  addArticle,
  getArticles,
  removeArticle,
};
