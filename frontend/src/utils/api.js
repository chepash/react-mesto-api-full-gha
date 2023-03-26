import { cardServerApiOptions } from './config';

class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }
    return res.json();
  }

  getCardList() {
    return fetch(`${this.baseUrl}/cards`, {
      credentials: 'include',
    }).then(this._getResponseData);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      credentials: 'include',
    }).then(this._getResponseData);
  }

  sendNewCardInfo(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        link,
      }),
      credentials: 'include',
    }).then(this._getResponseData);
  }

  sendUserInfo(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        about,
      }),
      credentials: 'include',
    }).then(this._getResponseData);
  }

  sendUserAvatar(avatarUrl) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
      credentials: 'include',
    }).then(this._getResponseData);
  }

  sendСardDeleteRequest(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then(this._getResponseData);
  }

  changeLikeCardStatus(cardId, isLikedByMe) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: isLikedByMe ? 'DELETE' : 'PUT',
      credentials: 'include',
    }).then(this._getResponseData);
  }
}

const api = new Api(cardServerApiOptions);

export default api;
