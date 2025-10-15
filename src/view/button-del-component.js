import { AbstractComponent } from '../framework/view/abstract-component.js';

function createButtonDelComponentTemplate() {
    return (
        `<button type="button" class="button-del">Очистить</button>`
    );
}

export default class ButtonDelComponent extends AbstractComponent {
    #handleClick = null;
    
    constructor({ onClick }) {
        super();
        this.#handleClick = onClick;
        this.element.addEventListener('click', this.#clickHandler);
    }

    get template() { 
        return createButtonDelComponentTemplate();
    }
    
    #clickHandler = (evt) => {
        evt.preventDefault();
        if (this.#handleClick) {
            this.#handleClick();
        }
    };
}

