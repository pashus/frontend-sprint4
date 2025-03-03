import '../pages/index.css';
import {enableValidation} from '../components/validate.js'
import {openModal, closeModal} from '../components/modal.js'
import {getCards, postCards, getUserData, updateName, getUserId} from './api.js'

export let userId;

//массив с карточками и контент темплейта
const placesList = document.querySelector('.places__list')
export const cardTemplate = document.querySelector('#card-template').content

//крестики, закрывающие попапы, псевдомассив
const closePopup = document.querySelectorAll('.popup__close')

//редактирование профиля попап
const profilePopup = document.querySelector('.popup_type_edit')
const profileFormElement = profilePopup.querySelector('.popup__form')
const nameInput = profilePopup.querySelector('.popup__input_type_name')
const jobInput = profilePopup.querySelector('.popup__input_type_description')

//добавление карточек попап
const cardPopup = document.querySelector('.popup_type_new-card')
const cardFormElement = cardPopup.querySelector('.popup__form')
const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name')
const cardUrlInput = cardPopup.querySelector('.popup__input_type_url')

//картинка у карточки попап
export const imagePopup = document.querySelector('.popup_type_image')

//элементы профиля
const profileEditButton = document.querySelector('.profile__edit-button')
const cardAddButton = document.querySelector('.profile__add-button')
const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profileImage = document.querySelector('.profile__image')

//добавление попапам плавных анимаций
profilePopup.classList.add('popup_is-animated')
cardPopup.classList.add('popup_is-animated')
imagePopup.classList.add('popup_is-animated')

//id пользователя
getUserId().then(id => {
    userId = id;
});

//добавление всех карточек с сервера
getCards(placesList)

//получение имени пользователя и описания 
getUserData(profileName, profileDescription, profileImage)

//автозаполнение в модальном окне редактирования профиля и его открытие
profileEditButton.addEventListener('click', function() {
    nameInput.value = profileName.textContent
    jobInput.value = profileDescription.textContent
    openModal(profilePopup);
});

//при нажатии на крестик закрываются попапы
closePopup.forEach(function (item) {
    item.addEventListener('click', function() {
        closeModal(item.closest('.popup'))
    })
});

//открытие попапа создания карточки
cardAddButton.addEventListener('click', function() {
    openModal(cardPopup)
});

//имя и текст на главном экране как в форме, 
// которую заполняют в попапе, и закрытие попапа
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    updateName(nameInput, jobInput)
    profileName.textContent = nameInput.value
    profileDescription.textContent = jobInput.value
    closeModal(profilePopup)
};
//что происходит при отправке формы
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

//создание объекта из имени и ссылки на картинку,
//данные которых вводятся в форме (в попапе редактирования карточек)
//очистка инпутов формы и закрытие попапа
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const newCard = {
        name: cardNameInput.value,
        link: cardUrlInput.value
    }
    postCards(newCard, placesList, cardFormElement, cardPopup)
};

//что происходит при отправке формы
cardFormElement.addEventListener('submit', handleCardFormSubmit);

const validationSettings = {
    formElements: '.popup__form',
    inputElementList: '.popup__input',
    buttonElement: '.popup__button',
    inactiveButtonClass: 'popup__button_type_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorTextClass: 'popup__error',
    errorTextClassActive: 'popup__error_active'
}
enableValidation(validationSettings)