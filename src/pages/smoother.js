import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import ScrollSmoother from "gsap/ScrollSmoother";
import Observer from "gsap/Observer";
//import Observer from "gsap/Observer";

// Регистрация плагинов (выполнится только один раз)
gsap.registerPlugin(Observer, ScrollTrigger, SplitText, ScrollSmoother);

// Создаем и экспортируем экземпляр ScrollSmoother

const isWrapperInPage = document.querySelector('#smooth-wrapper') && document.querySelector('#smooth-content');

export const smoother = isWrapperInPage ? ScrollSmoother.create({
  smooth: 2,
  effects: true,
  smoothTouch: 0.05,
  normalizeScroll: true
}) : null;


export const getSmoother = () => {
  return smoother;
}

// Экспортируем основные объекты GSAP для использования в проекте
export { gsap, ScrollTrigger, SplitText };