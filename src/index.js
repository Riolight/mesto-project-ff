import './pages/index.css'; // добавьте импорт главного файла стилей 
import {openModal, closeModal, editFormSubmit, formElement, formElementAdd, cardFormSubmit} from './components/modal.js'; 
export {modalWindowEdit, modalWindowCard};

// @todo: DOM узлы попап
const modalWindowEdit = document.querySelector('.popup_type_edit');
const modalWindowCard = document.querySelector('.popup_type_new-card');
const modalWindowImg = document.querySelector('.popup_type_image');

const openModalEditBtn = document.querySelector('.profile__edit-button');
const openModalAddBtn = document.querySelector('.profile__add-button');
const openModalImgBtn = document.querySelector('.card__image');

const closeModalBtns = document.querySelectorAll('.popup__close');
const saveModalBtns = document.querySelectorAll('.popup__button');

// @todo: Modal
openModalEditBtn.addEventListener('click', () => {
  openModal(modalWindowEdit);
});

openModalAddBtn.addEventListener('click', () => {
  openModal(modalWindowCard);
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
formElementAdd.addEventListener('submit', cardFormSubmit);