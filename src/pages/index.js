import './tw.css';
import './index.css';
import '../images/favicon.svg';

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import ScrollSmoother from "gsap/ScrollSmoother";
import Observer from "gsap/Observer";
//import Observer from "gsap/Observer";

// Регистрация плагинов (выполнится только один раз)
gsap.registerPlugin(Observer, ScrollTrigger, SplitText, ScrollSmoother);


// Создаем и экспортируем экземпляр ScrollSmoother
export const smoother = ScrollSmoother.create({
  smooth: 2,
  effects: true,
  smoothTouch: 0.05,
  normalizeScroll: true
});


export const getSmoother = () => {
  return smoother;
}

// Экспортируем основные объекты GSAP для использования в проекте
export { gsap, ScrollTrigger, SplitText };


const quizForm = document.forms.quiz;
const rezFieldsetsIdsArr = ["gorizontalnye-rezervuary-rgs", "gorizontalnye-rezervuary-rgsp", "vertikalnye-rezervuary", "silosy"];

//чекбоксы с резервуарами
const rezervuarTypeCheckboxes = quizForm.querySelectorAll('.formquiz__inputcheckbox');

//ищем fieldsets с массивами размеров
const sFielsetsNodes = rezFieldsetsIdsArr.map((id) => {
  const fs=quizForm.querySelector(`#sizes-${id}`);
  fs.classList.add('hidden');
  return fs;
});
//открываем первый массив (по умолчанию выбран 1 главный чекбокс)
sFielsetsNodes[0].classList.remove('hidden');

//ищем fieldsets с массивами размеров
const staffFielsetsNodes = rezFieldsetsIdsArr.map((id) => {
  const fs=quizForm.querySelector(`#staff-${id}`);
  fs.classList.add('hidden');
  return fs;
});
//открываем первый массив (по умолчанию выбран 1 главный чекбокс)
staffFielsetsNodes[0].classList.remove('hidden');



function setActiveSizesFieldset(rezType) {
  sFielsetsNodes.map((fnode)=> {
    if (fnode.id === `sizes-${rezType}`) {
      fnode.classList.remove('hidden')
    } else {
      fnode.classList.add('hidden')
    }
  })
}

function setActiveStaffFieldset(rezType) {
  staffFielsetsNodes.map((fnode)=> {
    if (fnode.id === `staff-${rezType}`) {
      fnode.classList.remove('hidden')
    } else {
      fnode.classList.add('hidden')
    }
  })
}

Array.from(rezervuarTypeCheckboxes).map((c) => {
  c.addEventListener("change", (evt) => {
    setActiveSizesFieldset(quizForm.elements.rezervuartype.value);
    setActiveStaffFieldset(quizForm.elements.rezervuartype.value);
  });
})


/*ALL JS */
import Api from "../js/components/Api";
import FormValidatorNew from "../js/components/FormValidatorNew";
import Popup from "../js/components/Popup";


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

const popupSelector = '.popup-with-form';
const formSelector = '.form-in-popup';
const formInputSelector = '.form__input';

const buttonsToOpenPopupWithForm = Array.from(document.querySelectorAll('.popup-callback-button'));

const formInPopup = document.querySelector(formSelector);
const formInPopupValidator = new FormValidatorNew(formInPopupConfig, formInPopup);
formInPopupValidator.enableValidation();

const modal = new PopupWithForm({
    handleClose: ()=> {
      smoother?.paused(false);
    },
    formSubmitHandler:  async (valuesObj) => {
        console.log(valuesObj);
        try {
        const resp = await formApi.sendSmallForm(valuesObj);
            if (resp.message && resp.message==='Норм') {
              modal.close();
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
}, popupSelector, formSelector, formInputSelector);

modal.setEventListeners();

buttonsToOpenPopupWithForm.map((i)=> {
  i.addEventListener('click', ()=>{
    modal.open(i.dataset.ctatext);
    // console.log('smoother buttonToOpenPopupWithForm', smoother)
    console.log("cta text", i.dataset.ctatext);
    if (smoother) {
      smoother.paused(true);
    }
  })
});


/* GSAP RAZREZ */

gsap.utils.toArray(".comparisonSectionWrapper").forEach(section => {
	let tl = gsap.timeline({
			scrollTrigger: {
				trigger: section,
				start: "top top",
        // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
				end: () => "+=" + section.offsetWidth,
				scrub: true,
				pin: true,
        //anticipatePin: 1
			},
			defaults: {ease: "none"}
		});
	// animate the container one way...
	tl
  .to("body", { backgroundColor: "#000", duration: 0.14 }, 0)
  .to(".text-logo-cs", {fill: '#f2f2f2', duration:0}, 0.05)
  .to(".text-logo-cs1", { yPercent: -50, duration:0.1}, 0.05)
  .fromTo(section.querySelector(".afterImage"), { xPercent: 100, x: 0}, {xPercent: 0}, 0)
	  // ...and the image the opposite way (at the same time)
	.fromTo(section.querySelector(".afterImage img"), {xPercent: -100, x: 0}, {xPercent: 0}, 0)
  // Появление первой галочки на 30% timeline
  .to(section.querySelector(".button-1"), { opacity: 1, duration:  0.01 }, 0.1)
  // Появление второй галочки на 50% timeline
  .to(section.querySelector(".button-2"), { opacity: 1, duration: 0.01 }, 0.3)
  // Появление третьей галочки на 80% timeline
  .to(section.querySelector(".button-3"), { opacity: 1, duration:  0.01 }, 0.4)
  .to("body", { backgroundColor: "#fff", duration: 0.14 }, 0.85);

});


/*

document.fonts.ready.then(() => {
  gsap.set(".container-spt", { opacity: 1 });
  let split = SplitText.create(".animate-me", { type: "words", aria: "hidden" });

  gsap.from(split.words, {
    opacity: 0,
    duration: 2,
    ease: "sine.out",
    stagger: 0.1,
  });
});

*/
document.fonts.ready.then(() => {
  const originalText = document.getElementById("original-text");
  const animatedText = document.getElementById("animated-text");

  // Клонируем текст для анимации
  //animatedText.innerHTML = originalText.innerHTML;

  // Инициализируем SplitText для линий
  const splitText =SplitText.create("#animated-text", {
    type: "lines",
    linesClass: "line linex relative overflow-hidden block",
    autoSplit: true,
  });

  // Создаем маски и настраиваем анимацию
  splitText.lines.forEach((line, index) => {
    // Создаем маску
    /*const mask = document.createElement('div');
    mask.className = 'absolute top-0 left-0 h-full w-full linemasc';
    line.prepend(mask);*/

    // Анимация
    gsap.fromTo(line,
    {
      width: 0, // Начальное состояние
      transformOrigin: "left center" // Точка трансформации
    },
    {
      width: '100%', // Конечное состояние
      ease: "power2.out", // Плавность анимации
      scrollTrigger: {
        trigger: line,
        start: "top 85%", // Точка начала анимации
        end: "top 30%", // Точка завершения анимации
        scrub: 1.5, // Плавная привязка к скроллу
        markers: false // Для отладки можно включить
      },
      delay: index * 0.25 // Задержка между строками
    }
  );
  });
});




window.addEventListener('load', function() {
  const contentAbove = document.querySelector('.content-above-footer');
  const footer = document.querySelector('.footer');
  const footerHeight = footer.offsetHeight;


  gsap.set(footer, { y: -footerHeight });

  // Затем анимация
  gsap.to(footer, {
    y: 0,
    ease: "none",
    immediateRender: false, // Важно!
    scrollTrigger: {
      trigger: contentAbove,
      start: "bottom bottom",
      end: `bottom+=${footerHeight} bottom`,
      scrub: true,
      //markers: true
    }
  });

 /* рабочий вариант
  // Настраиваем анимацию футера
  gsap.to(footer, {
    //y: 0, // Конечное положение
    scrollTrigger: {
      trigger: contentAbove,
      start: "bottom bottom", // Когда низ секции достигнет низа вьюпорта
      end: `bottom+=${footerHeight} bottom`, // Когда прокрутим на высоту футера
      //scrub: true, // Плавная привязка к скроллу
      markers: true, // Для отладки, потом удалить
      ease: "none",
      onUpdate: (self) => {
        const progress = self.progress;
        // Жесткая линейная привязка
        footer.style.transform = `translateY(${-footerHeight * (1 - progress)}px)`;
      }
    }
  }); */


});