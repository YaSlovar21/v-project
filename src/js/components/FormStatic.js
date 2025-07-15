export default class FormStatic {
  constructor({formSubmitHandler, formCleanError, checherValidation}, formElement, formInputSelector) {
      this._formSubmitHandler = formSubmitHandler;
      this._formCleanError = formCleanError;
      this._formElement = formElement; //объект формы
      this._inputSelector = formInputSelector; //класс .form__input
      this._checker = checherValidation;
  }

  //собираем поля формы
  _getInputValues() {
      this._inputList = this._formElement.querySelectorAll(this._inputSelector);
      this._formValues = {};
      this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
      });
      return this._formValues;
  }

  cleanAll() {
      this._formElement.reset();
      this._formCleanError();
  }

  setEventListeners() {
      this._formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
          if (this._checker()) {
            this._formSubmitHandler(this._getInputValues());
          }
      });
  }
}


/*  if (localStorage.getItem('clientId')) {
        this._formValues['clientId'] = localStorage.getItem('clientId');
      }
      this._formValues['page'] = window.location.pathname; */