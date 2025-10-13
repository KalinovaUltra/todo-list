import { AbstractComponent } from '../framework/view/abstract-component.js';


function createHeaderComponentTemplate() {
    return (
        `<b>Список задач</b>`
      );
}


export default class HeaderComponent extends AbstractComponent{
  get template() {
    return createHeaderComponentTemplate();
  }
}
