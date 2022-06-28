const popupList = document.querySelectorAll('.popup');
const popupCloseBtnList = document.querySelectorAll('.popup__close-button');
const popupForEditAuthor = document.querySelector('.popup_for_edit-author');
const popupForAddCard = document.querySelector('.popup_for_add-card');
const popupForScaleImg = document.querySelector('.popup_for_scale-image');
const profileEditOpenBtn = document.querySelector('.profile__button');
const cardAddOpenBtn = document.querySelector('.profile__add');

const formForEditAuthor = popupForEditAuthor.querySelector('.form');
const formForAddCard = popupForAddCard.querySelector('.form');
const formInputImage = formForAddCard.querySelector('.form__input_info_link-img');
const formInputTitle = formForAddCard.querySelector('.form__input_info_name-card');
const formImg = document.querySelector('.form__image');
const formImgTitle = document.querySelector('.form__image-title');

const authorProfile = document.querySelector('.profile__name');
const authorJobProfile = document.querySelector('.profile__description');
const authorProfileInput = document.querySelector('.form__input_type_name');
const authorJobProfileInput = document.querySelector('.form__submit');

const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card').content;

function openPopup(popup) {
  popup.classList.add('popup_visible');
  document.addEventListener('keydown', closeByEsc);
};

function openPropfilePopup() {
  authorProfileInput.value = authorProfile.textContent;
  authorJobProfileInput.value = authorJobProfile.textContent;
  openPopup(popupForEditAuthor);
};

function closePopup(popup) {
  popup.classList.remove('popup_visible');
  document.removeEventListener('keydown', closeByEsc);
};

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupVisible = document.querySelector('.popup_visible');
    closePopup(popupVisible);
  };
};

function submitProfileInfo(evt) {
  evt.preventDefault();
  authorProfile.textContent = authorProfileInput.value;
  authorJobProfile.textContent = authorJobProfileInput.value;
  closePopup(popupForEditAuthor);
};

function handleLikeButton(event)
{
  event.currentTarget.classList.toggle('element__like_active');
}

function removeCard(evt) {
  evt.target.closest('.element').remove();
}

function scaleImage(element) {
  openPopup(popupForScaleImg);
  formImg.src = element.src;
  formImg.alt = element.alt;
  formImgTitle.textContent = element.alt;
};

function addCard(image, title) {
  const cardFull = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardFull.querySelector('.element__image');
  cardImage.src = image;
  cardImage.alt = title;
  cardFull.querySelector('.element__title').textContent = title;
  cardFull.querySelector('.element__like').addEventListener('click', handleLikeButton);
  cardFull.querySelector('.element__delete').addEventListener('click', removeCard);
  cardImage.addEventListener('click', () => scaleImage(cardImage));
  return cardFull;
};

function renderCard(elementPlace, element) {
  elementPlace.prepend(element);
};

function submitAddCard(evt) {
  evt.preventDefault();
  const element = addCard(formInputImage.value, formInputTitle.value);
  renderCard(cardsContainer, element);
  const submitButton = evt.target.querySelector('.form__save');
  closePopup(popupForAddCard);
  const buttonInactive = {inactiveButtonClass: 'form__save_inactive'};
  disableButton(submitButton, buttonInactive);

  formForAddCard.reset();
};

initialCards.forEach((item) => {
  const element = addCard(item.link, item.name);
  renderCard(cardsContainer, element);
});

profileEditOpenBtn.addEventListener('click', openPropfilePopup);

cardAddOpenBtn.addEventListener('click', () => openPopup(popupForAddCard));

popupList.forEach((item) => {
  item.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup_visible') || evt.target.classList.contains('popup__close-button')) {
      closePopup(item);
    };
  });
});

formForEditAuthor.addEventListener('submit', submitProfileInfo);

formForAddCard.addEventListener('submit', submitAddCard);
