export {openModal, closeModal, editFormSubmit, formElement}; 
import {modalWindowEdit} from '../index.js'

// @todo: DOM узлы формы
const profilTitle = document.querySelector('.profile__title');
const profilDescription = document.querySelector('.profile__description');
const formElement = document.forms.editProfile;
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

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

    const name = form.elements.name;
    const link = form.elements.link;
    const cardContainer = createCard(name.value, link.value);



cardsContainer.appendChild(cardContainer);
  };

