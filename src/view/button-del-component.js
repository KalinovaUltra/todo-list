import {createElement} from '../framework/render.js'; 


function createButtonDelComponentTemplate() {
    return (
        `<button type="button" class="button-del">Очистить</button>`
      );
}


export default class ButtonDelComponent {
  getTemplate() {
    return createButtonDelComponentTemplate();
  }


  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }


    return this.element;
  }


  removeElement() {
    this.element = null;
  }
}
