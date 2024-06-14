import {cardTemplate} from '../index.js';
export {createCard, deleteCard};

// @todo: Функция создания карточки
function createCard(element, deleteCard) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
  
    cardElement.querySelector(".card__title").textContent = element.name;
    cardImage.src = element.link;
    cardImage.alt = element.name;
  
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", deleteCard);
  
    return cardElement;
  }
  
  // @todo: Функция удаления карточки
function deleteCard(evt) {
    const deleteCard = evt.target.closest(".places__item");
    deleteCard.remove();
  }

       
  
  