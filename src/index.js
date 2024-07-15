import './pages/index.css'; // импорт главного файла стилей
import { createCard, likeCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  postAddNewCard,
  handlerDeleteCard,
  updateUserAvatar,
} from './components/api.js';

export { cardTemplate };

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.places__list');

// @todo: DOM узлы формы
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const modalAvatar = document.querySelector('.popup_type_avatar');

// @todo: DOM узлы попап
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const profileForm = popupEdit.querySelector('.popup__form');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');

const popupCard = document.querySelector('.popup_type_new-card');
const newPlaceForm = popupCard.querySelector('.popup__form');
const nameDataCard = newPlaceForm.querySelector('.popup__input_type_card-name');
const linkDataCard = newPlaceForm.querySelector('.popup__input_type_url');

const popupImage = document.querySelector('.popup_type_image');
const popupImg = document.querySelector('.popup__image');
const popupCaptionImg = document.querySelector('.popup__caption');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const modalFormEditProfile = document.forms['edit-profile'];
const modalFormAddCard = document.forms['new-place'];
const modalFormEditAvatar = document.forms['edit-avatar'];

const popupAlert = document.querySelector('.popup_type_alert');
const submitDeleteCard = popupAlert.querySelector('.popup__button-alert');

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

let userId;

// @todo: Кнопка сохранения
const renderLoading = (isLoading, button) => {
  button.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
};

// @todo: Удаление карточки
const confirmDeleteCard = (cardId) => {
  openPopup(popupAlert);
  popupAlert.dataset.cardId = cardId;
};

const handlerConfirmDeleteCard = () => {
  handlerDeleteCard(popupAlert.dataset.cardId)
    .then((result) => {
      console.log(result);
      const deleteCard = document.getElementById(popupAlert.dataset.cardId);
      deleteCard.remove();
      closePopup(popupAlert);
    })
    .catch((err) => {
      console.log(err);
    });
};
submitDeleteCard.addEventListener('click', handlerConfirmDeleteCard);

// @todo: Редактирование профиля
profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, modalFormEditProfile.querySelector('.popup__button'));
  updateUserInfo({
    name: modalFormEditProfile.name.value,
    about: modalFormEditProfile.description.value,
  })
    .then((userInfo) => {
      profileTitle.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      closePopup(popupEdit);
    })
    .catch((err) => {
      console.log('ошибка изменения данных пользователя:', err);
    });
});

editButton.addEventListener('click', () => {
  profileForm.reset();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEdit);
  clearValidation(profileForm, configValidation);
});

// @todo: Добавление новой карточки
newPlaceForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, modalFormAddCard.querySelector('.popup__button'));
  postAddNewCard({
    name: nameDataCard.value,
    link: linkDataCard.value,
  })
    .then((dataCard) => {
      const cardElement = createCard({
        userId,
        dataCard,
        confirmDeleteCard,
        likeCard,
        openPopupImage,
      });
      cardsContainer.prepend(cardElement);
      newPlaceForm.reset();
      closePopup(popupCard);
    })
    .catch((err) => {
      console.log('ошибка добавления карточки:', err);
    });
});

addButton.addEventListener('click', () => {
  newPlaceForm.reset();
  openPopup(popupCard);
  clearValidation(newPlaceForm, configValidation);
});

// @todo: Обновление аватара
const handlerAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  renderLoading(true, modalFormEditAvatar.querySelector('.popup__button'));
  updateUserAvatar({
    link: modalFormEditAvatar.link.value,
  })
    .then((userAvatar) => {
      profileImage.style.backgroundImage = `url(${userAvatar.avatar})`;
      closePopup(modalAvatar);
    })
    .catch((err) => {
      console.log('ошибка добавления аватара:', err);
    });
};
modalFormEditAvatar.addEventListener('submit', handlerAvatarFormSubmit);

profileImage.addEventListener('click', () => {
  modalFormEditAvatar.reset();
  clearValidation(modalFormEditAvatar, configValidation);
  openPopup(modalAvatar);
});

// @todo: Открытие попапа картинки
const openPopupImage = (inputName, inputLink) => {
  popupImg.src = inputLink;
  popupImg.alt = inputName;
  popupCaptionImg.textContent = inputName;
  openPopup(popupImage);
};

// @todo: Закрытие всех попапов по крестику и оверлею
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup || evt.target.classList.contains('popup__close')) {
      const modal = document.querySelector('.popup_is-opened');
      closePopup(modal);
    }
  });
});

// @todo: Вывести карточки на страницу + информация пользователя
Promise.all([getInitialCards(), getUserInfo()])
  .then(([initialCards, userInfo]) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileImage.src = userInfo.avatar;
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
    userId = userInfo._id;

    initialCards.forEach((dataCard) => {
      const cardElement = createCard({
        userId,
        dataCard,
        confirmDeleteCard,
        likeCard,
        openPopupImage,
      });
      cardsContainer.append(cardElement);
    });
  })
  .catch((err) => {
    console.log('ошибка передачи карточки:', err);
  });

enableValidation(configValidation);
