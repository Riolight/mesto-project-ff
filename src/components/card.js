import { cardTemplate } from '../index.js';
export { createCard };

// @todo: Функция создания карточки
const createCard = ({
  userId,
  dataCard,
  confirmDeleteCard,
  confirmLikeCard,
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
    confirmLikeCard(evt, dataCard._id, counterLikes);
  });

  cardImage.addEventListener('click', () => {
    openPopupImage(dataCard.name, dataCard.link);
  });
  return cardElement;
};

