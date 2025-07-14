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