const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { validateDataWithJoi, validateRequiredCardData } = require('../utils/validation');

router.get('/', getCards);
router.post('/', validateRequiredCardData, createCard);
router.delete('/:cardId', validateDataWithJoi, deleteCard);
router.put('/:cardId/likes', validateDataWithJoi, likeCard);
router.delete('/:cardId/likes', validateDataWithJoi, dislikeCard);

module.exports = router;
