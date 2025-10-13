import { AbstractComponent } from '../framework/view/abstract-component.js';

function createButtonDelComponentTemplate() {
    return (
        `<button type="button" class="button-del">Очистить</button>`
    );
}

export default class ButtonDelComponent extends AbstractComponent {
    get template() { 
        return createButtonDelComponentTemplate();
    }
}
