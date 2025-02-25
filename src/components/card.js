import {openModal} from '../components/modal.js'
import {cardTemplate, imagePopup} from '../scripts/index.js'

//создание карточки, на вход подается объект из ключей name и link
export function createCard(data) {
    const cardElement = cardTemplate.cloneNode(true)
    const cardImage = cardElement.querySelector('.card__image')
    const cardTitle = cardElement.querySelector('.card__title')
    const deleteButton = cardElement.querySelector('.card__delete-button')
    const likeButton = cardElement.querySelector('.card__like-button')
    const cardPopupImage = imagePopup.querySelector('.popup__image')
    const cardPopupCaption = imagePopup.querySelector('.popup__caption')    

    cardTitle.textContent = data.name
    cardImage.src = data.link
    cardImage.alt = data.name

    //лайк в карточке
    likeButton.addEventListener('click', function(evt) {
        evt.target.classList.toggle('card__like-button_is-active')
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