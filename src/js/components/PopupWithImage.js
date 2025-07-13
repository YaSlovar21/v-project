import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor({popupImageSelector, popupImageDescSelector, hasDocLinkSelector}, popupSelector, handleClose) {
        super(popupSelector)
        this._popupImage = this._modal.querySelector(popupImageSelector);
        this._popupImageDesc = this._modal.querySelector(popupImageDescSelector);

        if (handleClose) {
            this._handleCloseFunc = handleClose;
        }

        if (hasDocLinkSelector) {
            this._popupLink = this._modal.querySelector(hasDocLinkSelector);
        }
    }

    open(data) {
        this._popupImage.src = data.imgSrc;
        this._popupImage.alt = data.name;
        this._popupImageDesc.textContent = data.name;
        if (this._popupLink) {
            this._popupLink.href = data.docPdfLink;
        }

        super.open();
    }

    close() {
        this._handleCloseFunc();
        setTimeout(()=> {
          this._popupImage.src = "";
        }, 500)

        this._popupImage.alt = "";
        super.close();
    }
}