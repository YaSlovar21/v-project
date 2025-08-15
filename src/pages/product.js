
import './tw.css';
import './product.css';


import '../images/favicon.svg';
import { gsap } from "gsap";

import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollSmoother);
gsap.registerPlugin(ScrollTrigger);

// create the scrollSmoother before your scrollTriggers
ScrollSmoother.create({
  smooth: 2, // how long (in seconds) it takes to "catch up" to the native scroll position
  effects: true, // looks for data-speed and data-lag attributes on elements
  smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
  normalizeScroll: true
});

const draws = Array.from(document.querySelectorAll('.product-draw'))
const cursorOuter = document.querySelector(".cursor-large");
//const cursorInner = document.querySelector(".cursor--small");

//cursorInner.classList.add('hidden');
cursorOuter.classList.add('hidden');

const listenerCurs = (e)=> {
  updateCursor(e)
}

function updateCursor(evt) {
  console.log('обновляем курсор на объекте');
	gsap.to([cursorOuter], {
		x:  evt.pageX ,
		y:  evt.pageY ,
	});
}


if ( draws && draws.length ) {
  draws.map(z => {
    z.addEventListener("mouseenter", (evt)=> {
      console.log('зашли')
      //cursorInner.classList.remove('hidden');
      cursorOuter.classList.remove('hidden');
      window.addEventListener("mousemove", listenerCurs);
      window.addEventListener("scroll", listenerCurs);
    });

    z.addEventListener("mouseleave", (evt)=> {
      console.log('вышли с', z)
      //cursorInner.classList.add('hidden');
      cursorOuter.classList.add('hidden');
      window.removeEventListener("mousemove", listenerCurs)
      window.removeEventListener("scroll", listenerCurs);
    })
  })
}

/* ScrollTrigger PIN секции с двумя моделями (общая и разрез)  в категории и в товаре */
const parent = document.querySelector('.all-sect');
const child = document.querySelector('.sticky-trigger');




window.addEventListener('load', function() {

  const parentHeight = parent.offsetHeight;
  const childHeight = child.offsetHeight;

    // Если дочерний элемент больше родителя - pin бессмысленен
    if (childHeight >= parentHeight) {
      console.warn('Дочерний элемент выше родителя - pin не будет работать правильно');
    }


  const rightStickySide = new ScrollTrigger({
    trigger: '.all-sect',
    start: "top top",
    end: `+=${parentHeight - childHeight}`, // Закрепление до достижения низа родителя
    pin: '.sticky-trigger',
    pinSpacing: false
  });

  rightStickySide.refresh();
});