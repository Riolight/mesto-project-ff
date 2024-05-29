// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const content = document.querySelector(".content");
const cardsConteiner = content.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(element, deleteCard) {
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = element.link;
  cardElement.querySelector(".card__title").textContent = element.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  const deleteCard = evt.target.closest(".places__item");
  deleteCard.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  const cardElement = createCard(element, deleteCard);

  cardsConteiner.append(cardElement);
});
