import FormStatic from "./FormStatic";

export default class FormStaticBigFormVik extends FormStatic {
  constructor({formSubmitHandler, formCleanError, checherValidation}, formElement, formInputSelector, formMainCheckboxSelector, formTankVolumeCheckboxSelector, formTankSubstanceCheckboxSelector) {
    super({formSubmitHandler, formCleanError, checherValidation}, formElement, formInputSelector);
  }

  //собираем поля формы
  _getInputValues() {
    const basicValues = super._getInputValues();
    const rezType = this._formElement.elements.rezervuartype.value;
    if (rezType) {
      const volume = this._formElement.querySelector(`#sizes-${rezType}-id`).value;
      const staff = this._formElement.querySelector(`#staff-${rezType}-id`).value;
      /*
      const volumesArr = Array.from(this._formElement.elements[`sizes-${rezType}`]).filter((item)=>{
        return item.checked;
      }).map((item)=> {
        return item.value;
      });;
      const staffArr = Array.from(this._formElement.elements[`staff-${rezType}`]).filter((item)=>{
        return item.checked;
      }).map((item)=> {
        return item.value;
      });;*/
       console.log(

        volume,
        staff
      );
      return {
        ...basicValues,
        rezType,
        volume,
        staff,
        page: window.location.pathname
      }
    } else return {
      ...basicValues,
      page: window.location.pathname
    };

  }
/*
  cleanAll() {
      this._formElement.reset();
      this._formCleanError();
  }
*/
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