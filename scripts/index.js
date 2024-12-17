const placesList = document.querySelector('.places__list')
const cardTemplate = document.querySelector('#card-template').content

function createCard(data) {
    const cardElement = cardTemplate.cloneNode(true)
    const cardImage = cardElement.querySelector('.card__image')
    const cardTitle = cardElement.querySelector('.card__title')
    const deleteButton = cardElement.querySelector('.card__delete-button')
    const likeButton = cardElement.querySelector('.card__like-button')

    cardTitle.textContent = data.name
    cardImage.src = data.link
    cardImage.alt = data.name

    return cardElement;
}

initialCards.forEach(function (item) {
    placesList.append(createCard(item))
});
