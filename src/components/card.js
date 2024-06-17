import { initialCards } from "./cards.js";
import { openModalImg } from "./modal.js";
export { createCard, deleteCard, cardsConteiner, like };

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const content = document.querySelector(".content");
const cardsConteiner = content.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(input, deleteCard) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeBtn = cardElement.querySelector(".card__like-button");

  cardElement.querySelector(".card__title").textContent = input.name;
  cardImage.src = input.link;
  cardImage.alt = input.name;

  deleteButton.addEventListener("click", deleteCard);
  likeBtn.addEventListener("click", like);
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
function like(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  const cardElement = createCard(element, deleteCard);
  cardsConteiner.append(cardElement);
});
