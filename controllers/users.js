const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const BadRequestError = require("../errors/BadRequestError");
const ConFlictError = require("../errors/ConflictError");
const NotFoundError = require("../errors/NotFoundError");
const UnauthorizedError = require("../errors/UnauthorizedError");

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!password) {
    next(new BadRequestError("Password is required"));
  }
  return bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        email,
        name,
        password: hash,
      })
    )
    .then((user) => {
      res.send({
        name: user.name,
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data provided"));
      } else if (err.code === 11000) {
        next(
          new ConFlictError(
            "This email address is already used with an account"
          )
        );
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError("Email or Password not found"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          next(new UnauthorizedError("Email or Password not found"));
        }
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === "production" ? JWT_SECRET : "dev_secret",
          {
            expiresIn: "7d",
          }
        );
        res.send({ token });
      });
    })
    .catch(() => {
      next(
        new UnauthorizedError(
          "Login is denies due to invalid email or password"
        )
      );
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError("User not found"));
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid user ID"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
};
