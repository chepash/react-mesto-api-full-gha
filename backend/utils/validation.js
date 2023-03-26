const { celebrate, Joi } = require('celebrate');

module.exports.validateDataWithJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri().regex(/^https?:\/\/((www\.)|(?!www\.)).+\./i),
  }),
  params: Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    cardId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  }),
});

module.exports.validateRequiredCardData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri().regex(/^https?:\/\/((www\.)|(?!www\.)).+\./i),
  }),
});

module.exports.validateSignInData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateSignUpData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri().regex(/^https?:\/\/((www\.)|(?!www\.)).+\./i),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
