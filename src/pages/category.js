const mainCatImg = document.querySelector('.main-category-img');

const initialSrc = mainCatImg.src;
const hoverSrc = mainCatImg.dataset.hover || false;

if (hoverSrc) {
  mainCatImg.addEventListener('mouseenter', ()=> {
    mainCatImg.src=hoverSrc;
  });
  mainCatImg.addEventListener('mouseleave', ()=> {
    mainCatImg.src=initialSrc;
  })
}