import FormStatic from "./FormStatic";

export default class FormStaticBigFormVik extends FormStatic {
  constructor({formSubmitHandler, formCleanError, checherValidation}, formElement, formInputSelector, formMainCheckboxSelector, formTankVolumeCheckboxSelector, formTankSubstanceCheckboxSelector) {
    super({formSubmitHandler, formCleanError, checherValidation}, formElement, formInputSelector);
    //this._mainCheckBoxSelector = formMainCheckboxSelector;
    //this._volumeCheckBoxSelector = formTankVolumeCheckboxSelector;
    //this._substanceCheckBoxSelector = formTankSubstanceCheckboxSelector;
  }

  //собираем поля формы
  _getInputValues() {
    const basicValues = super._getInputValues();
    const rezType = this._formElement.elements.rezervuartype.value;
    if (rezType) {
      const volumesArr = Array.from(this._formElement.elements[`sizes-${rezType}`]).filter((item)=>{
        return item.checked;
      }).map((item)=> {
        return item.value;
      });;
      const staffArr = Array.from(this._formElement.elements[`staff-${rezType}`]).filter((item)=>{
        return item.checked;
      }).map((item)=> {
        return item.value;
      });;
      /* console.log({
        ...basicValues,
        rezType,
        volumesArr,
        staffArr
      }); */
      return {
        ...basicValues,
        rezType,
        volumesArr,
        staffArr
      }
    } else return basicValues;

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