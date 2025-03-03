import {createCard} from '../components/card.js'
import {closeModal} from '../components/modal.js'

const config = {
    baseUrl: 'https://nomoreparties.co/v1/apf-cohort-202',
    headers: {
        authorization: '703cdbc7-14dc-4943-885f-99acf17a3a17',
        'Content-Type': 'application/json'
    }
};

//общая проверка ответа
const handleResponse = (res) => {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
};

//общий обработчик ошибки
const handleError = (err) => {
    return console.log(`Ошибка: ${err}`)
}

export const getCards = (placesList) => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(handleResponse)
        .then((data) => data.forEach(item => {
            placesList.append(createCard(item))
        }))
        .catch(handleError)
};

export const postCards = (newCard, placesList, cardFormElement, cardPopup) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(newCard)
    })
        .then(handleResponse)
        .then(cardData => {
            placesList.prepend(createCard(cardData)); 
            cardFormElement.reset()
            console.log(cardData) 
            closeModal(cardPopup); 
        })
        .catch(handleError)
};

export const getUserId = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
        .then(handleResponse)
        .then(userData => userData._id)
        .catch(handleError)
}

export const getUserData = (profileName, profileDescription, profileImage) => {
    fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
        .then(handleResponse)
        .then(userData => {
            profileName.textContent = userData.name
            profileDescription.textContent = userData.about
            profileImage.setAttribute('style', `background-image: url('${userData.avatar}');`);
        })
        .catch(handleError)
};

export const updateName = (nameInput, jobInput) => {
    fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: nameInput.value,
            about: jobInput.value
        })
    })
        .then(handleResponse)
        .then(data => console.log(data))
        .catch(handleError)
};

export const updateLike = (method, likeCount, idData, evt) => {
    fetch(`${config.baseUrl}/cards/likes/${idData}`, {
        method: method,
        headers: config.headers
    })
        .then(handleResponse)
        .then(data => {
            likeCount.textContent = data.likes.length
            evt.target.classList.toggle('card__like-button_is-active')
        })
        .catch(handleError)
};

export const deleteCard = (idData, evt) => {
    fetch(`${config.baseUrl}/cards/${idData}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(handleResponse)
        .then(() => {
            evt.target.closest('.card').remove()
        })
        .catch(handleError)
}

export const updateAvatar = (avatarInputLink, profileImage, avatarFormElement) => {
    fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarInputLink
        })
    })
        .then(handleResponse)
        .then(() => {
            profileImage.setAttribute('style', `background-image: url('${avatarInputLink}');`);
            avatarFormElement.reset()
        })
        .catch(handleError)
}