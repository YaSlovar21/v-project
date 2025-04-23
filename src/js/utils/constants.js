//секция, куда загружаются карточки проектов
export const projectsContainerSelector = '.projects__items';

//template карточки проекта
export const projectTemplateSelector = "#project-template";
export const projectHorizontalTemplateSelector = "#project-horizontal-template";

export const cardArticleConfig = {
  cardArticleTemplateSelector: '#article-template',
  articleCardSelector: '.card-item',
  articleTagsSectionSelector: '.card-item-header',
  articleTagClass: 'card-item-span-button',
  articleHeadSelector: '.card-item-title',
  articleDescSelector: '.card-item-description',
  articleLinkSelector: '.card-item-link',
  cardListSection: '.cards-js-rendered',
}


export const ESC_CODE = 'Escape';

//секция, куда загружаются карточки проектов
export const cardsContainerSelector = '.projects__items';

//template карточки проекта
export const cardTemplateSelector = "#project-template";

export const partnersSectionConfig = {
  containerSelector: '.map__list',
  itemTemplateSelelector: '#partner-item-template',
  activeClass: 'map__list-item_active',
}

//селекторы модальных окон
export const popupImageSelector = '.popup-viewport';
export const callBackPopupSelector = '.popup-callback';
export const popupWithToSelector = '.popup-to';
export const popupWithMenuSelector = '.popup-menu';


//конфиги

// конфиг селекторов в модальном окне с картиной и подписью
export const popupImageSelectorsCongig = {
    popupImageSelector: '.popup__image',
    popupImageDescSelector: '.popup__image-description'
}


export const popupToConfig = {
  popupImageToSelector: '.popup__to-img',
  popupImageContainerSelector: '.popup__to-img-container',
  popupImageNameSelector: '.popup__to-name',
  popupImageDescSelector: '.popup__to-desc',
  popupImageLink3dSelector: '.popup__to-3dlink',
}

export const formValidatorConfig = {
  inputSelector: '.raschet-bem__input',
  submitButtonSelector: '.button-bem',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'raschet-bem__input_type_error',
  errorClass: 'raschet-bem__input-error_visible'
}

export const raschetValidatorConfig = {
  inputSelector: '.raschet-bem__input',
  submitButtonSelector: '.raschet-bem__submit-button',
  inactiveButtonClass: 'raschet-bem__submit-button_disabled',
  inputErrorClass: 'raschet-bem__input_type_error',
  errorClass: 'raschet-bem__input-error_visible'
}

export const lineformConfig = {
  inputSelector: '.lineform__input',
  submitButtonSelector: '.lineform__button-save',
  inactiveButtonClass: 'raschet-bem__submit-button_disabled',
  inputErrorClass: 'raschet-bem__input_type_error',
  errorClass: 'raschet-bem__input-error_visible'
}

export const rgsSizes = [
  10, 3, 5, 4, 6, 7, 8, 9, 11, 12, 15, 20, 25, 30, 40, 50, 60, 75, 100, 200,
  150, 160, 120, 80, 70, 65, 45,
];
export const rvsSizes = [3, 5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 80, 100];
export const rgspSizes = [
  10, 5, 3, 15, 20, 25, 30, 40, 50, 60, 75, 100, 80, 90, 150, 200
];
export const silosySizes = [
  10, 20, 30, 50, 60, 75, 100, 150, 200, 500, 600, 1000, 2000, 3000, 5000
];




