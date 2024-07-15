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
const profileImg = content.querySelector('.profile__image');

// @todo: DOM узлы формы
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// @todo: DOM узлы попап
const popups = document.querySelectorAll('.popup__content');
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

const profileImage = document.querySelector('.profile__image');
const modalAvatar = document.querySelector('.popup_type_avatar');
const editAvatarButton = document.querySelector('.profile__image');

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

const renderLoading = (isLoading, button) => {
  button.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
};

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

// @todo: Modal
const editProfileForm = () => {
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEdit);
};

profileForm.addEventListener('submit', (evt) => {
  renderLoading(true, modalFormEditProfile.querySelector('.popup__button'));
  evt.preventDefault();
  updateUserInfo({
    name: nameInput.value,
    about: jobInput.value,
  })
    .then((result) => {
      editProfileForm(result);
    })
    .catch((err) => {
      console.log('ошибка изменения данных пользователя:', err);
    })
    .finally(() => {
      renderLoading(
        false,
        modalFormEditProfile.querySelector('.popup__button')
      );
    });
});

editButton.addEventListener('click', () => {
  profileForm.reset();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEdit);
  clearValidation(profileForm, configValidation);
});

newPlaceForm.addEventListener('submit', (evt) => {
  renderLoading(true, modalFormAddCard.querySelector('.popup__button'));
  evt.preventDefault();
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
    })
    .finally(() => {
      renderLoading(false, modalFormAddCard.querySelector('.popup__button'));
    });
});

addButton.addEventListener('click', () => {
  newPlaceForm.reset();
  openPopup(popupCard);
  clearValidation(newPlaceForm, configValidation);
});

const handlerAvatarFormSubmit = (evt) => {
  renderLoading(true, modalFormEditAvatar.querySelector('.popup__button'));
  evt.preventDefault();
  updateUserAvatar(modalFormEditAvatar.link.value)
    .then((userInfo) => {
      profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
      closePopup(modalAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, modalFormEditAvatar.querySelector('.popup__button'));
    });
};
modalFormEditAvatar.addEventListener('submit', handlerAvatarFormSubmit);

editAvatarButton.addEventListener('click', () => {
  modalFormEditAvatar.reset();
  clearValidation(modalFormEditAvatar, configValidation);
  openPopup(modalAvatar);
});

const openPopupImage = (inputName, inputLink) => {
  popupImg.src = inputLink;
  popupImg.alt = inputName;
  popupCaptionImg.textContent = inputName;
  openPopup(popupImage);
};

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
      const modal = document.querySelector('.popup_is-opened');
      closePopup(modal);
    }
  });
});

// @todo: Вывести карточки на страницу
Promise.all([getInitialCards(), getUserInfo()])
  .then(([initialCards, userInfo]) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileImg.src = userInfo.avatar;
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

popupEdit.addEventListener('click', (evt) => {
  if (evt.target === popupEdit) {
    closePopup(popupEdit);
  }
});

popupCard.addEventListener('click', (evt) => {
  if (evt.target === popupCard) {
    closePopup(popupCard);
  }
});

popupImage.addEventListener('click', (evt) => {
  if (evt.target === popupImage) {
    closePopup(popupImage);
  }
});

modalAvatar.addEventListener('click', (evt) => {
  if (evt.target === modalAvatar) {
    closePopup(modalAvatar);
  }
});

popupAlert.addEventListener('click', (evt) => {
  if (evt.target === popupAlert) {
    closePopup(popupAlert);
  }
});
