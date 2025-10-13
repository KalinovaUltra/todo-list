import { AbstractComponent } from '../framework/view/abstract-component.js';

function createPlugComponentTemplate() { 
    return (
        `<li class="plug">Перетащите карточку</li>`      
    );
}

export default class PlugComponent extends AbstractComponent {
    constructor() {
        super();
    }

    get template() {
        return createPlugComponentTemplate(); 
    }
}