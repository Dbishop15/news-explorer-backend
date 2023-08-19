const router = require("express").Router();

const article = require("./articles");

const user = require("./users");

const NotFoundError = require("../errors/NotFoundError");

const { login, createUser } = require("../controllers/users");

const {
  validateUserBody,
  validateUserLogIn,
} = require("../middlewares/validation");

router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateUserLogIn, login);

router.use("/users", user);
router.use("/articles", article);

router.use((req, res, next) => {
  next(new NotFoundError("Address does not exist."));
});

module.exports = router;
