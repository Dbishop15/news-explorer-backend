const jwt = require("jsonwebtoken");
// const { JWT_SECRET } = require("../utils/config");
const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require("../errors/UnauthorizedError");

const handleAutError = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authorization token is missing");
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev_secret"
    );
  } catch (err) {
    return next(new UnauthorizedError("Authorization token is incorrect"));
  }

  req.user = payload;

  next();

  return null;
};

module.exports = {
  handleAutError
};
