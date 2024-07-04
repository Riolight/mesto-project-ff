export { openPopap, closePopap };

function openPopap(popap) {
  popap.classList.add('popup_is-opened');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', closeEscPopap);
}

function closePopap(popap) {
  popap.classList.remove('popup_is-opened');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', closeEscPopap);
}

function closeEscPopap(evt) {
  if (evt.code === 'Escape') {
    const modal = document.querySelector('.popup_is-opened');
    closePopap(modal);
  }
}