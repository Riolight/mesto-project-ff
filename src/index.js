import './pages/index.css'; // добавьте импорт главного файла стилей 
import {initialCards} from './components/cards.js'; 
import {createCard, deleteCard} from './components/card.js'; 
import {openModal, closeModal, editFormSubmit, formElement} from './components/modal.js'; 
export {cardTemplate, modalWindowEdit, modalWindowCard, cardsConteiner};


// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const content = document.querySelector(".content");
const cardsConteiner = content.querySelector(".places__list");

// @todo: DOM узлы попап
const modalWindowEdit = document.querySelector('.popup_type_edit');
const modalWindowCard = document.querySelector('.popup_type_new-card');
const modalWindowImg = document.querySelector('.popup_type_image');

const openModalEditBtn = document.querySelector('.profile__edit-button');
const openModalAddBtn = document.querySelector('.profile__add-button');
const openModalImgBtn = document.querySelector('.card__image');

const closeModalBtns = document.querySelectorAll('.popup__close');
const saveModalBtns = document.querySelectorAll('.popup__button');

// @todo: Вывести карточки на страницу
initialCards.forEach(element => {
 const cardElement = createCard(element, deleteCard);
  cardsConteiner.append(cardElement);
});

// @todo: Modal
openModalEditBtn.addEventListener('click', () => {
  openModal(modalWindowEdit);
});

openModalAddBtn.addEventListener('click', () => {
  openModal(modalWindowCard);
  console.log(openModal(modalWindowCard))
});

openModalImgBtn.addEventListener('click', () => {
  console.log(openModal(modalWindowImg))
});

closeModalBtns[0].addEventListener('click', () => {
  closeModal(modalWindowEdit);
});

closeModalBtns[1].addEventListener('click', () => {
  closeModal(modalWindowCard);
});

document.addEventListener('keydown', (evt) => {
  if (evt.code === "Escape") {
    closeModal(modalWindowEdit); 
    closeModal(modalWindowCard); 
  }
});

modalWindowEdit.addEventListener('click', (evt) => {
  if (evt.target === modalWindowEdit) {
   closeModal(modalWindowEdit); 
  }
});

modalWindowCard.addEventListener('click', (evt) => {
  if (evt.target === modalWindowCard) {
   closeModal(modalWindowCard); 
  }
});

formElement.addEventListener('submit', editFormSubmit);