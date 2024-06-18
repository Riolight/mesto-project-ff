import "./pages/index.css"; // импорт главного файла стилей
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, addlLike} from "./components/card.js";
import {
  openModal,
  closeModal
} from "./components/modal.js";
export {
  modalWindowEdit,
  formElementAdd,
  modalWindowCard,
  modalWindowImg,
  openModalImg,
  cardTemplate,
  closeModalBtns
};

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const content = document.querySelector(".content");
const cardsConteiner = content.querySelector(".places__list");

// @todo: DOM узлы формы
const profilTitle = document.querySelector(".profile__title");
const profilDescription = document.querySelector(".profile__description");

const formElement = document.forms.editProfile;
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

// @todo: DOM узлы попап
const modalWindowEdit = document.querySelector(".popup_type_edit");
const modalWindowCard = document.querySelector(".popup_type_new-card");
const formElementAdd = modalWindowCard.querySelector(".popup__form");
const modalWindowImg = document.querySelector(".popup_type_image");

const openModalEditBtn = document.querySelector(".profile__edit-button");
const openModalAddBtn = document.querySelector(".profile__add-button");

const closeModalBtns = document.querySelectorAll(".popup__close");

// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  const cardElement = createCard(element, deleteCard);
  cardsConteiner.append(cardElement);
});

// @todo: Modal
openModalEditBtn.addEventListener("click", () => {
  nameInput.value = profilTitle.textContent;
  jobInput.value = profilDescription.textContent;
  openModal(modalWindowEdit);
});

openModalAddBtn.addEventListener("click", () => {
  openModal(modalWindowCard);
});

for (let closeModalBtn of closeModalBtns) {
  closeModalBtn.addEventListener("click", () => {
    closeModal(modalWindowEdit);
    closeModal(modalWindowCard);
    closeModal(modalWindowImg);
  });  
};

function editFormProfile(evt) {
  evt.preventDefault();
  profilTitle.textContent = nameInput.value;
  profilDescription.textContent = jobInput.value;
  closeModal(modalWindowEdit);
};

function addNewCard(evt) {
  evt.preventDefault();

  const name = formElementAdd.querySelector(".popup__input_type_card-name");
  const link = formElementAdd.querySelector(".popup__input_type_url");
  const cardElement = createCard(
    {
      name: name.value,
      link: link.value,
    },
    deleteCard,
    addlLike
  );

  cardsConteiner.prepend(cardElement);
  formElementAdd.reset();
  closeModal(modalWindowCard);
};

function openModalImg(inputName, inputLink) {
  openModal(modalWindowImg);

  const popapImg = document.querySelector(".popup__image");
  const bpopapCaption = document.querySelector(".popup__caption");

  popapImg.src = inputLink;
  popapImg.alt = inputName;
  bpopapCaption.textContent = inputName;
};

formElement.addEventListener("submit", editFormProfile);
formElementAdd.addEventListener("submit", addNewCard);
