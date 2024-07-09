const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
  headers: {
    authorization: 'bd5bec3d-633a-49cb-9f54-22ded73cd96e',
    'Content-Type': 'application/json',
  },
};

// GET-запрос информации о пользователе
export const getInfoUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// GET-запрос вывода карточек на страницу
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// PATCH-запрос редактирования карточки
export const patchEditProfileForm = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about,
    })
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
})
};

// POST-запрос добавления карточки
export const postAddNewCard = (dataCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
        name: dataCard.name,
        link: dataCard.link,
    })
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
});
};

// PUT-запрос добавления лайка
export const putLikeCard = (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify({
        likes: card.like,
        _id: card._id,
    })
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
});
};
