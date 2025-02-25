export {toggleButton, enableValidation}

//добавляет инпуту класс, с которым он становится ошибочным
//показывает строку с конкретной ошибкой валидации
function showInputError(formElement, inputElement, errorText, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(settings.inputErrorClass)
    errorElement.textContent = errorText
    errorElement.classList.add(settings.errorTextClassActive)
    errorElement.classList.remove(settings.errorTextClass)
}

//отменяет всё из функции показа ошибки
function closeInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(settings.inputErrorClass)
    errorElement.textContent = ''
    errorElement.classList.remove(settings.errorTextClassActive)
    errorElement.classList.add(settings.errorTextClass)
}

//проверка на валидность
function isValidate(formElement, inputElement, settings) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings)
    } else {
        closeInputError(formElement, inputElement, settings)
    }
}

//изменение кнопки в зависимости от того, валидны ли оба инпута
function toggleButton(inputElementList, buttonElement) {
    const isFormValid = inputElementList.every(inputElement => {
        return inputElement.validity.valid
    })
    if (isFormValid) {
        buttonElement.removeAttribute('disabled')
        buttonElement.classList.remove('popup__button_type_disabled')
    } else {
        buttonElement.setAttribute('disabled', 0)
        buttonElement.classList.add('popup__button_type_disabled')
    }
}

//берет из конкретной формы инпуты и кнопку. для инпутов вызывает
//функцию изменения кнопок. для конкретного инпута смотрит валиден ли он
function setEventListeners(formElement, settings) {
    const inputElementList = Array.from(formElement.querySelectorAll(settings.inputElementList))
    const buttonElement = formElement.querySelector(settings.buttonElement)
    inputElementList.forEach((inputElement => {
        inputElement.addEventListener('input', () => {
            isValidate(formElement, inputElement, settings)
            toggleButton(inputElementList, buttonElement)
        })
    }))
}

//смотрит все формы на странице, для каждой вызывает функцию setEventListeners
function enableValidation(settings) {
    const formElements = Array.from(document.querySelectorAll(settings.formElements))
    formElements.forEach(formElement => {
        formElement.addEventListener('submit', evt => {
            evt.preventDefault()
        })
        setEventListeners(formElement, settings)
    })
}