import './tw.css';
import './index.css';
import '../images/favicon.svg';

import Api from "../js/components/Api";
import FormValidatorNew from "../js/components/FormValidatorNew";
import Popup from "../js/components/Popup";
import { gsap, ScrollTrigger, smoother } from './smoother.js';

const popupMenu = new Popup('.popup-menu');
popupMenu.setEventListeners();

const navMobileButton = document.querySelector('.nav__mobile-icon');
navMobileButton.addEventListener('click', () => {
    popupMenu.open();
    console.log('111');
});


//mport {getSmoother} from '../pages/smoother.js';

/* ОТПРАВКА ФОРМЫ */
const formInPopupConfig = {
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_visible'
  }

const formApi = new Api({
    baseUrl: 'https://api-cms.kupcov.com',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
    },
});


import PopupWithForm from "../js/components/PopupWithForm";
import { renderLoading } from '../js/utils/utils';

const popupSelector = '.popup-with-form';
const formSelector = '.form-in-popup';
const formInputSelector = '.form__input';

const buttonToOpenPopupWithForm = document.querySelector('.popup-callback-button');

const formInPopup = document.querySelector(formSelector);
const submitButtonInPopup = formInPopup.querySelector(formInPopupConfig.submitButtonSelector);
const formInPopupValidator = new FormValidatorNew(formInPopupConfig, formInPopup);
formInPopupValidator.enableValidation();

const modal = new PopupWithForm({
    handleClose: ()=> {
      smoother?.paused(false);
    },
    formSubmitHandler:  async (valuesObj) => {
        console.log(valuesObj);
        renderLoading('loading', submitButtonInPopup, 'Оставить заявку', 'Отправляем...', 'Отправлено успешно!');
        try {
            const resp = await formApi.sendSmallForm(valuesObj);
            //const resp = {message: 'Норм'};
            if (resp.message && resp.message==='Норм') {
              renderLoading('sended', submitButtonInPopup, 'Оставить заявку', 'Отправляем...', 'Отправлено успешно!');
              setTimeout(()=> {
                renderLoading('default', submitButtonInPopup, 'Оставить заявку', 'Отправляем...', 'Отправлено успешно');
                modal.close();
              }, 700)
            } else {
                throw new Error('Вернулся какой то не такой объект')
            }
        } catch(e) {
            console.log('Что то пошло не так', e);
        }
    },
    formCleanError: () => {
            formInPopupValidator.cleanAllErrors();
    },
    checherValidation: (formElement) => {
        if (!formInPopupValidator.hasInvalidInput()) {
        return true;
        } else {
        formInPopupValidator.showErrors();
        return false;
        }
    }
}, popupSelector, formSelector, formInputSelector)

modal.setEventListeners();

buttonToOpenPopupWithForm.addEventListener('click', ()=>{
    modal.open();
    console.log('smoother buttonToOpenPopupWithForm', smoother )
    if (smoother) {
      smoother.paused(true);
    }
})