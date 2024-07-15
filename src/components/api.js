export {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  updateUserAvatar,
  postAddNewCard,
  handlerDeleteCard,
  addLike,
  deleteLike
};

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
  headers: {
    authorization: 'bd5bec3d-633a-49cb-9f54-22ded73cd96e',
    'Content-Type': 'application/json',
  },
};

const handleRes = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// GET-запрос информации о пользователе
const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleRes);
};

// GET-запрос вывода карточек на страницу
const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleRes);
};

// PATCH-запрос редактирования карточки
const updateUserInfo = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about
    }),
  }).then(handleRes);
};

// PATCH-запрос обновления аватара
const updateUserAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    }),
  }).then(handleRes);
}

// POST-запрос добавления карточки
const postAddNewCard = (dataCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(dataCard),
  }).then(handleRes);
};

// DELETE-запрос удаления карточки
const handlerDeleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(handleRes);
};

// PUT-запрос добавления лайка
const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  }).then(handleRes);
};

// DELETE-запрос удаления лайка
const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(handleRes);
};
