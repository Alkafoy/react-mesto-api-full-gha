class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    _responseHandler(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`ошибка: ${res.status}`);
        }
    }

    getUserInfo(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })
            .then(res => {
                return this._responseHandler(res);
            })
    }

    getInitialCards(token) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })
            .then(res => {
                return this._responseHandler(res);
            })
    }

    editUserInfo(data, token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._responseHandler)
    }

    editAvatar(data, token) {
        return fetch(
            `${this._baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization" : `Bearer ${token}`
                },
                body: JSON.stringify({
                    avatar: data.avatar,
                })
            }
        )
            .then(this._responseHandler)
    }

    addCard(data, token) {
        return fetch(
            `${this._baseUrl}/cards`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization" : `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: data.title,
                    link: data.link
                })
            })
            .then(this._responseHandler)
    }

    addLike(cardId, token) {
        return fetch(
            `${this._baseUrl}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization" : `Bearer ${token}`
                }
            })
            .then(this._responseHandler)
    }

    deleteLike(cardId, token) {
        return fetch(
            `${this._baseUrl}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization" : `Bearer ${token}`
                }
            })
            .then(this._responseHandler)
    }

    deleteCard(cardId, token) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            }
        })
            .then(this._responseHandler)
    }
}

const api = new Api({ baseUrl: 'https://api.esergey.mesto.nomoredomainsicu.ru' });

export default api;