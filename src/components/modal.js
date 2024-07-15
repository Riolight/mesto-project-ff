export { openPopup, closePopup };

// @todo: Открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', closeEscPopup);
}

// @todo: Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', closeEscPopup);
}

// @todo: Закрытие попапа ESC
function closeEscPopup(evt) {
  if (evt.code === 'Escape') {
    const modal = document.querySelector('.popup_is-opened');
    closePopup(modal);
  }
}
