import { cardTemplate } from '../index.js';
import { addLike, deleteLike } from './api.js';
export { createCard, likeCard };

// @todo: Функция создания карточки
const createCard = ({
  userId,
  dataCard,
  confirmDeleteCard,
  likeCard,
  openPopupImage,
}) => {
  const cardElement = cardTemplate
    .querySelector('.places__item')
    .cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const counterLikes = cardElement.querySelector('.card__counter-like');

  cardElement.id = dataCard['_id'];

  cardElement.querySelector('.card__title').textContent = dataCard.name;
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  counterLikes.textContent = dataCard.likes.length;

  const isLiked = dataCard.likes.some((like) => like._id === userId);
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (dataCard.owner._id === userId) {
    deleteButton.addEventListener('click', (evt) => {
      confirmDeleteCard(dataCard._id);
    });
  } else {
    deleteButton.remove();
  }

  likeButton.addEventListener('click', (evt) => {
    likeCard(evt, dataCard._id, counterLikes);
  });

  cardImage.addEventListener('click', () => {
    openPopupImage(dataCard.name, dataCard.link);
  });
  return cardElement;
};

// @todo: Функция лайка
const likeCard = (evt, cardId, counterLikes) => {
  if (evt.target.classList.contains('card__like-button_is-active')) {
    deleteLike(cardId)
      .then((updatedCard) => {
        evt.target.classList.remove('card__like-button_is-active');
        counterLikes.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log('ошибка удаления лайка:', err);
      });
  } else {
    addLike(cardId)
      .then((updatedCard) => {
        evt.target.classList.add('card__like-button_is-active');
        counterLikes.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log('ошибка удобавления лайка:', err);
      });
  }
};
