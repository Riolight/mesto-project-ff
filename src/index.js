import "./pages/index.css"; // импорт главного файла стилей
import {
  openModal,
  closeModal,
  editFormProfile,
  cardFormAdd,
} from "./components/modal.js";
export {
  modalWindowEdit,
  formElementAdd,
  modalWindowCard,
  modalWindowImg,
  profilTitle,
  profilDescription,
  nameInput,
  jobInput,
};

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

// @todo: Modal
openModalEditBtn.addEventListener("click", () => {
  nameInput.value = profilTitle.textContent;
  jobInput.value = profilDescription.textContent;
  openModal(modalWindowEdit);
});

openModalAddBtn.addEventListener("click", () => {
  openModal(modalWindowCard);
});

closeModalBtns[0].addEventListener("click", () => {
  closeModal(modalWindowEdit);
});

closeModalBtns[1].addEventListener("click", () => {
  closeModal(modalWindowCard);
});

closeModalBtns[2].addEventListener("click", () => {
  closeModal(modalWindowImg);
});

document.addEventListener("keydown", (evt) => {
  if (evt.code === "Escape") {
    closeModal(modalWindowEdit);
    closeModal(modalWindowCard);
    closeModal(modalWindowImg);
  }
});

modalWindowEdit.addEventListener("click", (evt) => {
  if (evt.target === modalWindowEdit) {
    closeModal(modalWindowEdit);
  }
});

modalWindowCard.addEventListener("click", (evt) => {
  if (evt.target === modalWindowCard) {
    closeModal(modalWindowCard);
  }
});

modalWindowImg.addEventListener("click", (evt) => {
  if (evt.target === modalWindowImg) {
    closeModal(modalWindowImg);
  }
});

formElement.addEventListener("submit", editFormProfile);

formElementAdd.addEventListener("submit", cardFormAdd);
