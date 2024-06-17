export { openModal, closeModal, editFormProfile, cardFormAdd, openModalImg };
import {
  modalWindowEdit,
  formElementAdd,
  modalWindowCard,
  modalWindowImg,
  profilTitle,
  profilDescription,
  nameInput,
  jobInput,
} from "../index.js";
import { createCard, deleteCard, cardsConteiner, like } from "./card.js";

function openModal(element) {
  element.classList.add("popup_is-opened");
  element.classList.add("popup_is-animated");
  document.body.style.overflow = "hidden";
}

function closeModal(element) {
  element.classList.remove("popup_is-opened");
  document.body.style.overflow = "";
}

function editFormProfile(evt) {
  evt.preventDefault();
  profilTitle.textContent = nameInput.value;
  profilDescription.textContent = jobInput.value;
  closeModal(modalWindowEdit);
}

function cardFormAdd(evt) {
  evt.preventDefault();

  const name = formElementAdd.querySelector(".popup__input_type_card-name");
  const link = formElementAdd.querySelector(".popup__input_type_url");
  const cardElement = createCard(
    {
      name: name.value,
      link: link.value,
    },
    deleteCard,
    like
  );

  cardsConteiner.prepend(cardElement);
  formElementAdd.reset();
  closeModal(modalWindowCard);
}

function openModalImg(inputName, inputLink) {
  openModal(modalWindowImg);

  const popapImg = document.querySelector(".popup__image");
  const bpopapCaption = document.querySelector(".popup__caption");

  popapImg.src = inputLink;
  popapImg.alt = inputName;
  bpopapCaption.textContent = inputName;
}
