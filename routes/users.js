const router = require("express").Router();

const { getCurrentUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.get("/me", auth.handleAutError, getCurrentUser);

module.exports = router;
