import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskListComponentTemplate(title, status) {
    return (
        `<div class="flex-item">
            <span-${status}>${title}</span-${status}>
            <ul class="task-list task-list-${status}"></ul>
        </div>`
        
    );
}
export default class TaskListComponent extends AbstractComponent {
    #title = null;
    #status = null;
    constructor({status, label}) { 
        super(); 
        this.#status = status;
        this.#title = label; 
    }


    get template() {
        return createTaskListComponentTemplate(this.#title, this.#status);
    }
}