
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
const cursorOuter = document.querySelector(".cursor--large");
const cursorInner = document.querySelector(".cursor--small");

cursorInner.classList.add('hidden');
cursorOuter.classList.add('hidden');

const listenerCurs = (e)=> {
  updateCursor(e)
}

function updateCursor(evt) {
  console.log('обновляем курсор на объекте');
  //const rectMap = evt.target.closest('.product-draw').getBoundingClientRect();
	gsap.to([cursorInner, cursorOuter], {
		x:  evt.pageX ,
		y:  evt.pageY ,
	});
}


if ( draws && draws.length ) {
  draws.map(z => {
    z.addEventListener("mouseenter", (evt)=> {
      console.log('зашли')
      cursorInner.classList.remove('hidden');
      cursorOuter.classList.remove('hidden');
      window.addEventListener("mousemove", listenerCurs);
      window.addEventListener("scroll", listenerCurs);
    });

    z.addEventListener("mouseleave", (evt)=> {
      console.log('вышли с', z)
      cursorInner.classList.add('hidden');
      cursorOuter.classList.add('hidden');
      window.removeEventListener("mousemove", listenerCurs)
      window.removeEventListener("scroll", listenerCurs);
    })
  })
}