import { gsap, ScrollTrigger, SplitText } from "./smoother.js";

gsap.utils.toArray(".comparisonSection").forEach(section => {
	let tl = gsap.timeline({
			scrollTrigger: {
				trigger: section,
				start: "top top",
        // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
				end: () => "+=" + section.offsetWidth,
				scrub: true,
				pin: true,
        anticipatePin: 1
			},
			defaults: {ease: "none"}
		});
	// animate the container one way...
	tl
  .to("body", { backgroundColor: "#111", duration: 0.14 }, 0)
  .to(".text-logo-cs", {fill: '#f2f2f2', duration:0 }, 0.05)
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