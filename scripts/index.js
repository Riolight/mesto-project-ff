const content = document.querySelector(".content");
const cardsConteiner = content.querySelector(".places__list");

initialCards.forEach(function (element) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = element.link;
  cardElement.querySelector(".card__title").textContent = element.name;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", function (evt) {
      let deleteCard = evt.target.classList.toggle(".places__item");
      cardElement.remove(deleteCard);
    });

  cardsConteiner.append(cardElement);
});

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
