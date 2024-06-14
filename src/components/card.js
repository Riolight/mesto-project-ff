import {initialCards} from './cards.js'; 
export {createCard, deleteCard, cardsConteiner};

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsConteiner = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(input, deleteCard) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
  
    cardElement.querySelector(".card__title").textContent = input.name;
    cardImage.src = input.link;
    cardImage.alt = input.name;
  
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
initialCards.forEach(element => {
    const cardElement = createCard(element, deleteCard);
     cardsConteiner.append(cardElement);
   });
  