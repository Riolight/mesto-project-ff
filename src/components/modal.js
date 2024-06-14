export {openModal, closeModal, editFormSubmit, formElement, formElementAdd, cardFormSubmit}; 
import {modalWindowEdit, modalWindowCard} from '../index.js'
import {createCard, deleteCard, cardsConteiner} from './card.js'

// @todo: DOM узлы формы
const profilTitle = document.querySelector('.profile__title');
const profilDescription = document.querySelector('.profile__description');
const formElement = document.forms.editProfile;
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

const formElementAdd = document.forms.newPlace;
const placeNameInput = formElementAdd.elements.placeName;
const linkInput = formElementAdd.elements.link;

function openModal(element) {
    element.classList.add('popup_is-opened');
    element.classList.add('popup_is-animated');
    document.body.style.overflow = 'hidden';
    nameInput.value = profilTitle.textContent;
    jobInput.value = profilDescription.textContent;
  };
  
  function closeModal(element) {
    element.classList.remove('popup_is-opened');
    document.body.style.overflow = '';
  };

  function editFormSubmit(evt) {
    evt.preventDefault();
    profilTitle.textContent = nameInput.value;
    profilDescription.textContent = jobInput.value;
    closeModal(modalWindowEdit);
  };

  function cardFormSubmit(evt) {
    evt.preventDefault();

    const cardContainer = createCard(placeNameInput.value, deleteCard);

    cardsConteiner.appendChild(cardContainer);
    formElementAdd.reset();
    closeModal(modalWindowCard);
  };

