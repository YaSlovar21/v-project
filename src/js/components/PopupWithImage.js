import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor({popupImageSelector, popupImageDescSelector, hasDocLinkSelector}, popupSelector) {
        super(popupSelector)
        this._popupImage = this._modal.querySelector(popupImageSelector);
        this._popupImageDesc = this._modal.querySelector(popupImageDescSelector);

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
        setTimeout(()=> {
          this._popupImage.src = "";
        }, 500)

        this._popupImage.alt = "";
        super.close();
    }
}