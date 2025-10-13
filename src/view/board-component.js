import { AbstractComponent } from '../framework/view/abstract-component.js';

function createBoardComponentTemplate() {
    return (
        `<div class="flex-container"></div>`
    );
}

export default class BoardComponent extends AbstractComponent {
    get template() {  
        return createBoardComponentTemplate();
    }
}
