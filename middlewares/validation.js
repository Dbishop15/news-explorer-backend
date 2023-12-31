const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().empty("").min(2).max(30).messages({
      "string.min": "The minimum length of the `name` field is 2",
      "string.max": "The maximum length of the `name` field is 30",
    }),
    email: Joi.string().required().email().messages({
      "string.empty": "The `email` field must be filled in",
      "string.email": "The `email` field must be a valid email",
    }),
    password: Joi.string().required().messages({
      "string.empty": "The `password` field must be filled in",
    }),
  }),
});

const validateUserLogIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": "The `email` field must be filled in",
      "string.email": "The `email` field must be a valid email",
    }),
    password: Joi.string().required().messages({
      "string.empty": "The `password` field must be filled in",
    }),
  }),
});
const validateArticleInfoBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().messages({
      "string.empty": 'The "keyword" field must be filled in',
    }),
    title: Joi.string().required().messages({
      "string.empty": 'The "title" field must be filled in',
    }),
    text: Joi.string().required().messages({
      "string.empty": 'The "text" field must be filled in',
    }),
    date: Joi.string().required().messages({
      "string.empty": 'The "date" field must be filled in',
    }),
    source: Joi.string().required().messages({
      "string.empty": 'The "source" field must be filled in',
    }),
    link: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "link" field must be filled in',
      "string.uri": 'The "link" field must a valid URL',
    }),
    image: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "image" field must be filled in',
      "string.uri": 'The "image" field must a valid URL',
    }),
  }),
});
const validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24).messages({
      "string.hex": "The `articleId` url parameter must be hexadecimal",
      "string.length":
        "The length of `articleId` url parameter must be 24 characters",
    }),
  }),
});

module.exports = {
  validateUserBody,
  validateUserLogIn,
  validateArticleInfoBody,
  validateArticleId,
};
