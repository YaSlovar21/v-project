import PopupWithImage from '../js/components/PopupWithImage.js';

import {
  popupImageSelector,     //попап с картинкой (селектор)
  popupImageSelectorsCongig
} from '../js/utils/constants.js';

import { getSmoother } from './smoother.js';


function handleClose() {
  const smoother = getSmoother();
  if (smoother) {
    console.log('z nen handleClose')
    smoother.paused(false);
  }
}

const popupImage = new PopupWithImage(
  popupImageSelectorsCongig,
  '.popup-product',
  handleClose
);

popupImage.setEventListeners();

document.querySelectorAll('.popup-image-item').forEach((item) => {
    item.addEventListener("mousedown", (evt) => {
      evt.stopPropagation();
      console.log(evt.target);
      popupImage.open({
        imgSrc: evt.target.querySelector('img') ? evt.target.querySelector('img').src : evt.target.src,
        desc: evt.target.querySelector('img') ? evt.target.querySelector('img').alt : evt.target.alt,
        docPdfLink: evt.target.querySelector('img') ? evt.target.querySelector('img').dataset.pdf : evt.target.dataset.pdf,
      });
      const smoother = getSmoother();
        if (smoother) {
          smoother.paused(true);
        }
    });
  });
