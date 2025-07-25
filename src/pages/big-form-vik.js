import Api from "../js/components/Api";
import FormStaticBigFormVik from "../js/components/FormStaticBigFormVik";
import FormValidatorNew from "../js/components/FormValidatorNew";

const formBigApi = new Api({
  baseUrl: 'https://api-cms.kupcov.com',
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
  },
});

const bigVikingFormConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible'
}

const formBigElement = document.forms.quiz;

const formBigValidator = new FormValidatorNew({
  inputSelector: bigVikingFormConfig.inputSelector,
  inputErrorClass: bigVikingFormConfig.inputErrorClass,
  errorClass: bigVikingFormConfig.errorClass,
  submitButtonSelector: bigVikingFormConfig.submitButtonSelector,
  inactiveButtonClass: bigVikingFormConfig.inactiveButtonClass
}, formBigElement);

formBigValidator.enableValidation();

const formBig = new FormStaticBigFormVik({
  formSubmitHandler:  async (valuesObj) => {
      console.log(valuesObj);
      
      try {
      const resp = await formBigApi.sendBigForm(valuesObj);
          if (resp.message && resp.message==='Норм') {
            modal.close();
          } else {
              throw new Error('Вернулся какой то не такой объект')
          }
      } catch(e) {
          console.log('Что то пошло не так', e);
      }
    },
    formCleanError: ()=> {
      formBigValidator.cleanAllErrors();
    },
    checherValidation:  (formElement) => {
      if (!formBigValidator.hasInvalidInput()) {
        return true;
      } else {
        formBigValidator.showErrors();
        return false;
      }
  }
  },
  formBigElement,
  '.form__input' //formInputSelector,
);

formBig.setEventListeners();


/*
{
    "name": "34423",
    "tel": "23",
    "email": "23@43",
    "comment": "234234",
    "rezType": "silosy",
    "volumesArr": [
        "50"
    ],
    "staffArr": [
        "Вода_силосы"
    ]
}
*/