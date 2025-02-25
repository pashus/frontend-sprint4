export {openModal, closeModal}
import {toggleButton} from './validate.js'

//открытие модального окна и проверка, что он
//содержит форму, для проверки на валидные инпуты при открытии
function openModal(popup) {
    popup.classList.add('popup_is-opened');
    if (popup.querySelector('.popup__form')) {
        checkPopupInputs(popup)
    }
    document.addEventListener('keydown', closeByEsc)
    popup.addEventListener('click', closeByClick)
};

//функция проверки заполненности и валидности ИЗНАЧАЛЬНЫХ
//данных в инпутах
function checkPopupInputs(popup) {
    const formElement = popup.querySelector('.popup__form')
    const inputElementList = Array.from(formElement.querySelectorAll('.popup__input'))
    const buttonElement = formElement.querySelector('.popup__button')
    toggleButton(inputElementList, buttonElement)
}

//закрытие модального окна
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc)
    popup.removeEventListener('click', closeByClick)
};

//закрытие модального окна через esc
function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened')
        closeModal(openedPopup);
    }
}

//закрытие модального окна по клику вне его
function closeByClick(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
        closeModal(evt.target)
    }
}