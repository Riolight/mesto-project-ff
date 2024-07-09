import './pages/index.css'; // импорт главного файла стилей
import { createCard, deleteCard, addLike } from './components/card.js';
import { openPopap, closePopap } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
export { cardTemplate };
import {
  getInfoUser,
  getInitialCards,
  patchEditProfileForm,
  postAddNewCard,
} from './components/api.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const cardsConteiner = content.querySelector('.places__list');
const profileImg = content.querySelector('.profile__image');

// @todo: DOM узлы формы
const profilTitle = document.querySelector('.profile__title');
const profilDescription = document.querySelector('.profile__description');

// @todo: DOM узлы попап
const popaps = document.querySelectorAll('.popup__content');
const modalWindowEdit = document.querySelector('.popup_type_edit');
const profileForm = modalWindowEdit.querySelector('.popup__form');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const modalWindowCard = document.querySelector('.popup_type_new-card');
const newPlaceForm = modalWindowCard.querySelector('.popup__form');
const nameDataCard = newPlaceForm.querySelector('.popup__input_type_card-name');
const linkDataCard = newPlaceForm.querySelector('.popup__input_type_url');
const modalWindowImg = document.querySelector('.popup_type_image');
const popapImg = document.querySelector('.popup__image');
const popapCaptionImg = document.querySelector('.popup__caption');
const openModalEditBtn = document.querySelector('.profile__edit-button');
const openModalAddBtn = document.querySelector('.profile__add-button');
const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  errorVisible: '.popup__error_visible',
  inputErrorVisible: '.popup__input_type_error',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

// @todo: Вывести карточки на страницу
getInitialCards()
  .then((result) => {
    console.log(result);
    result.forEach((dataCard) => {
      const cardElement = createCard(
        dataCard,
        deleteCard,
        addLike,
        openModalImg
      );
      cardsConteiner.append(cardElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });

Promise.all([getInitialCards, getInfoUser]).then((results) => {
  console.log(results);
});

// @todo: Modal
openModalEditBtn.addEventListener('click', () => {
  nameInput.value = profilTitle.textContent;
  jobInput.value = profilDescription.textContent;
  openPopap(modalWindowEdit);
  clearValidation(profileForm, newPlaceForm, configValidation);
});

openModalAddBtn.addEventListener('click', () => {
  openPopap(modalWindowCard);
  clearValidation(profileForm, newPlaceForm, configValidation);
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

function addNewCard(dataCard) {
  const cardElement = createCard(dataCard, deleteCard, addLike, openModalImg);
  cardsConteiner.prepend(cardElement);
  newPlaceForm.reset();
  closePopap(modalWindowCard);
}

function editProfileForm() {
  profilTitle.textContent = nameInput.value;
  profilDescription.textContent = jobInput.value;
  closePopap(modalWindowEdit);
}

function openModalImg(inputName, inputLink) {
  popapImg.src = inputLink;
  popapImg.alt = inputName;
  popapCaptionImg.textContent = inputName;
  openPopap(modalWindowImg);
}

profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  patchEditProfileForm({
    name: nameInput.value,
    about: jobInput.value,
  }).then((data) => {
    editProfileForm(data);
  });
});

newPlaceForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  postAddNewCard({
    name: nameDataCard.value,
    link: linkDataCard.value,
  }).then((dataCard) => {
    addNewCard(dataCard);
  });
});

enableValidation(configValidation);

getInfoUser()
  .then((result) => {
    profilTitle.textContent = result.name;
    profilDescription.textContent = result.about;
    profileImg.src = result.avatar;
  })
  .catch((err) => {
    console.log(err);
  });
