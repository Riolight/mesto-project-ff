import { openModalImg, cardTemplate} from "../index.js";
export { createCard, deleteCard, addlLike};

// @todo: Функция создания карточки
function createCard(input, deleteCard) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeBtn = cardElement.querySelector(".card__like-button");

  cardElement.querySelector(".card__title").textContent = input.name;
  cardImage.src = input.link;
  cardImage.alt = input.name;

  deleteButton.addEventListener("click", deleteCard);
  likeBtn.addEventListener("click", addlLike);
  cardImage.addEventListener("click", () => {
    openModalImg(input.name, input.link);
  });
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  const deleteCard = evt.target.closest(".places__item");
  deleteCard.remove();
}

// @todo: Функция лайка
function addlLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

