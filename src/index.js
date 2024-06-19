import './pages/index.css'; // импорт главного файла стилей
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, addLike } from './components/card.js';
import { openPopap, closePopap } from './components/modal.js';
export { cardTemplate };

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const cardsConteiner = content.querySelector('.places__list');

// @todo: DOM узлы формы
const profilTitle = document.querySelector('.profile__title');
const profilDescription = document.querySelector('.profile__description');

// @todo: DOM узлы попап
const popaps = document.querySelectorAll('.popup__content');
const modalWindowEdit = document.querySelector('.popup_type_edit');
const formElementEdit = modalWindowEdit.querySelector('.popup__form');
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const jobInput = formElementEdit.querySelector('.popup__input_type_description');
const modalWindowCard = document.querySelector('.popup_type_new-card');
const formElementAdd = modalWindowCard.querySelector('.popup__form');
const nameInputCard = formElementAdd.querySelector('.popup__input_type_card-name');
const linkInputCard = formElementAdd.querySelector('.popup__input_type_url');
const modalWindowImg = document.querySelector('.popup_type_image');
const popapImg = document.querySelector('.popup__image');
const popapCaptionImg = document.querySelector('.popup__caption');
const openModalEditBtn = document.querySelector('.profile__edit-button');
const openModalAddBtn = document.querySelector('.profile__add-button');

// @todo: Вывести карточки на страницу
initialCards.forEach((dataCard) => {
  const cardElement = createCard(dataCard, deleteCard, addLike, openModalImg);
  cardsConteiner.append(cardElement);
});

// @todo: Modal
openModalEditBtn.addEventListener('click', () => {
  nameInput.value = profilTitle.textContent;
  jobInput.value = profilDescription.textContent;
  openPopap(modalWindowEdit);
});

openModalAddBtn.addEventListener('click', () => {
  openPopap(modalWindowCard);
});

popaps.forEach((popap) => {
  popap.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
      const modal = document.querySelector('.popup_is-opened');
      closePopap(modal);
    }
  });
});

modalWindowEdit.addEventListener('click', (evt) => {
  if (evt.target === modalWindowEdit) {
    closePopap(modalWindowEdit);
  }
});

modalWindowCard.addEventListener('click', (evt) => {
  if (evt.target === modalWindowCard) {
    closePopap(modalWindowCard);
  }
});

modalWindowImg.addEventListener('click', (evt) => {
  if (evt.target === modalWindowImg) {
    closePopap(modalWindowImg);
  }
});

function editFormProfile(evt) {
  evt.preventDefault();
  profilTitle.textContent = nameInput.value;
  profilDescription.textContent = jobInput.value;
  closePopap(modalWindowEdit);
}

function addNewCard(evt) {
  evt.preventDefault();
  const cardElement = createCard(
    {
      name: nameInputCard.value,
      link: linkInputCard.value,
    },
    deleteCard,
    addLike,
    openModalImg
  );

  cardsConteiner.prepend(cardElement);
  formElementAdd.reset();
  closePopap(modalWindowCard);
}

function openModalImg(inputName, inputLink) {
  popapImg.src = inputLink;
  popapImg.alt = inputName;
  popapCaptionImg.textContent = inputName;
  openPopap(modalWindowImg);
}

formElementEdit.addEventListener('submit', editFormProfile);
formElementAdd.addEventListener('submit', addNewCard);
