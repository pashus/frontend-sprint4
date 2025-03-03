import {openModal} from '../components/modal.js'
import {cardTemplate, imagePopup, userId} from '../scripts/index.js'
import {updateLike} from '../scripts/api.js'

//создание карточки, на вход подается объект из ключей name и link
export function createCard(data) {
    const cardElement = cardTemplate.cloneNode(true)
    const cardImage = cardElement.querySelector('.card__image')
    const cardTitle = cardElement.querySelector('.card__title')
    const deleteButton = cardElement.querySelector('.card__delete-button')
    const likeButton = cardElement.querySelector('.card__like-button')
    const cardPopupImage = imagePopup.querySelector('.popup__image')
    const cardPopupCaption = imagePopup.querySelector('.popup__caption')    
    const likeCount = cardElement.querySelector('.card__like-count')

    cardTitle.textContent = data.name
    cardImage.src = data.link
    cardImage.alt = data.name
    likeCount.textContent = data.likes.length

    //лайк в карточке
    //проверка на то, есть ли мой айди в лайках и если да, то
    //лайк будет закрашен
    if (data.likes.some(like => like._id === userId)) {
        likeButton.classList.add('card__like-button_is-active')
    }

    likeButton.addEventListener('click', function(evt) {
        const isLiked = evt.target.classList.contains('card__like-button_is-active')
        const method = isLiked ? 'DELETE' : 'PUT';
        updateLike(method, likeCount, data._id, evt)
    });

    //удаление карточки
    deleteButton.addEventListener('click', function(evt) {
        evt.target.closest('.card').remove()
    });

    //открытие картинки попап
    cardImage.addEventListener('click', function() {
        cardPopupImage.src = cardImage.src
        cardPopupCaption.textContent = cardTitle.textContent
        openModal(imagePopup)
    });

    return cardElement;
};