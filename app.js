require("dotenv").config();

var requireStack = require("require-stack");

const express = require("express");

const mongoose = require("mongoose");
const { errors } = require("celebrate");

const cors = require("cors");
const helmet = require("helmet");

const limiter = require("./utils/limiter");

const { PORT = 3001 } = process.env;

const routes = require("./routes");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errors());
app.listen(PORT);
