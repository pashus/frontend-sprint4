import {createCard} from '../components/card.js'
import {closeModal} from '../components/modal.js'

const config = {
    baseUrl: 'https://nomoreparties.co/v1/apf-cohort-202',
    headers: {
        authorization: '703cdbc7-14dc-4943-885f-99acf17a3a17',
        'Content-Type': 'application/json'
    }
};

export const getCards = (placesList) => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => res.json())
        .then((data) => data.forEach(item => {
            placesList.append(createCard(item))
        }))
        .catch(err => console.log(`Ошибка: ${err}`))
};

export const postCards = (newCard, placesList, cardFormElement, cardPopup) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(newCard)
    })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
            return res.json();
        })
        .then(cardData => {
            placesList.prepend(createCard(cardData)); 
            console.log(cardData)
            cardFormElement.reset() 
            closeModal(cardPopup); 
        })
        .catch(err => console.log(`Ошибка: ${err}`))
};

export const getUserId = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
        .then(res => res.json())
        .then(userData => userData._id)
        .catch(err => console.log(`Ошибка: ${err}`))
}

export const getUserData = (profileName, profileDescription, profileImage) => {
    fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
        .then(res => res.json())
        .then(userData => {
            profileName.textContent = userData.name
            profileDescription.textContent = userData.about
            profileImage.setAttribute('style', `background-image: url('${userData.avatar}');`);
        })
        .catch(err => console.log(`Ошибка: ${err}`))
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
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(`Ошибка: ${err}`))
};

export const updateLike = (method, likeCount, idData, evt) => {
    fetch(`${config.baseUrl}/cards/likes/${idData}`, {
        method: method,
        headers: config.headers
    })
        .then(res => res.json())
        .then(data => {
            likeCount.textContent = data.likes.length
            evt.target.classList.toggle('card__like-button_is-active')
        })
        .catch(err => console.log(`Ошибка: ${err}`))
};