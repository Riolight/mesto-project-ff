import './pages/index.css'; // импорт главного файла стилей
import { createCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  postAddNewCard,
  handleDeleteCard,
  updateUserAvatar,
  handleCardLike,
  deleteLikeCard,
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
const modalFormEditAvatar = document.forms['edit-avatar'];

const popupAlert = document.querySelector('.popup_type_alert');
const submitDeleteCard = popupAlert.querySelector('.popup__button-alert');

let userId;

// @todo: Функция кнопки сохранения
const renderLoading = (isLoading, buttonElement) => {
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = 'Сохранение';
    buttonElement.classList.add(configValidation.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }
};

// @todo: Функция добавление новой карточки
newPlaceForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const buttonElement = evt.submitter;
  renderLoading(true, buttonElement);
  postAddNewCard({
    name: nameDataCard.value,
    link: linkDataCard.value,
  })
    .then((dataCard) => {
      const cardElement = createCard({
        userId,
        dataCard,
        confirmDeleteCard,
        confirmLikeCard,
        openPopupImage,
      });
      cardsContainer.prepend(cardElement);
      newPlaceForm.reset();
      closePopup(popupCard);
    })
    .catch((err) => {
      console.log('ошибка добавления карточки:', err);
    })
    .finally(() => {
      renderLoading(false, buttonElement);
    });
});

// @todo: Функция лайка
const confirmLikeCard = (evt, cardId, counterLikes) => {
  if (evt.target.classList.contains('card__like-button_is-active')) {
    deleteLikeCard(cardId)
      .then((updatedCard) => {
        evt.target.classList.remove('card__like-button_is-active');
        counterLikes.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log('ошибка удаления лайка:', err);
      });
  } else {
    handleCardLike(cardId)
      .then((updatedCard) => {
        evt.target.classList.add('card__like-button_is-active');
        counterLikes.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log('ошибка добавления лайка:', err);
      });
  }
};

// @todo: Функция удаление карточки
const confirmDeleteCard = (cardId) => {
  openPopup(popupAlert);
  popupAlert.dataset.cardId = cardId;
};

const handleConfirmDeleteCard = () => {
  handleDeleteCard(popupAlert.dataset.cardId)
    .then((result) => {
      console.log(result);
      const deleteCard = document.getElementById(popupAlert.dataset.cardId);
      deleteCard.remove();
      closePopup(popupAlert);
    })
    .catch((err) => {
      console.log('ошибка удаления карточки:', err);
    });
};

// @todo: Функция открытие попапа картинки
const openPopupImage = (inputName, inputLink) => {
  popupImg.src = inputLink;
  popupImg.alt = inputName;
  popupCaptionImg.textContent = inputName;
  openPopup(popupImage);
};

// @todo: Функция редактирование профиля
profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const buttonElement = evt.submitter;
  renderLoading(true, buttonElement);
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
    })
    .finally(() => {
      renderLoading(false, buttonElement);
    });
});

// @todo: Функция обновления аватара
const handlerAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  const buttonElement = evt.submitter;
  renderLoading(true, buttonElement);
  updateUserAvatar({
    link: modalFormEditAvatar.link.value,
  })
    .then((userInfo) => {
      profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
      closePopup(modalAvatar);
    })
    .catch((err) => {
      console.log('ошибка добавления аватара:', err);
    })
    .finally(() => {
      renderLoading(false, buttonElement);
    });
};

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEdit);
  clearValidation(profileForm, configValidation);
});

addButton.addEventListener('click', () => {
  newPlaceForm.reset();
  openPopup(popupCard);
  clearValidation(newPlaceForm, configValidation);
});

profileImage.addEventListener('click', () => {
  modalFormEditAvatar.reset();
  clearValidation(modalFormEditAvatar, configValidation);
  openPopup(modalAvatar);
});

submitDeleteCard.addEventListener('click', handleConfirmDeleteCard);
modalFormEditAvatar.addEventListener('submit', handlerAvatarFormSubmit);

// @todo: Вывести карточки на страницу + информация пользователя
Promise.all([getInitialCards(), getUserInfo()])
  .then(([initialCards, userInfo]) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
    userId = userInfo._id;

    initialCards.forEach((dataCard) => {
      const cardElement = createCard({
        userId,
        dataCard,
        confirmDeleteCard,
        confirmLikeCard,
        openPopupImage,
      });
      cardsContainer.append(cardElement);
    });
  })
  .catch((err) => {
    console.log('ошибка передачи карточки:', err);
  });

// @todo: Закрытие всех попапов по крестику и оверлею
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup || evt.target.classList.contains('popup__close')) {
      const modal = document.querySelector('.popup_is-opened');
      closePopup(modal);
    }
  });
});

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

enableValidation(configValidation);
