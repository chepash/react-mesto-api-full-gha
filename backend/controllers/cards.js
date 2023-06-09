const mongoose = require('mongoose');

const { STATUS_OK_CREATED } = require('../utils/constants');

const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const WrongCardOwnerError = require('../errors/WrongCardOwnerError');

// GET /cards
module.exports.getCards = (req, res, next) => Card.find({})
  .sort({ createdAt: -1 })
  .then((cards) => res.send(cards))
  .catch(next);

// POST /cards
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  return Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(STATUS_OK_CREATED).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        const validationError = new BadRequestError();
        validationError.message = err.message;
        next(validationError);
      } else {
        next(err);
      }
    });
};

// DELETE /cards/:cardId
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  return Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((card) => {
      if (card.owner._id.toString() === req.user._id) {
        return card.deleteOne();
      }
      throw new WrongCardOwnerError();
    })
    .then((cards) => res.send(cards))
    .catch(next);
};

// PUT /cards/:cardId/likes
module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => {
    throw new NotFoundError();
  })
  .then((card) => res.send(card))
  .catch(next);

// DELETE /cards/:cardId/likes
module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => {
    throw new NotFoundError();
  })
  .then((card) => res.send(card))
  .catch(next);
