import {createElement} from '../framework/render.js'; 

function createTaskListComponentTemplate(title, status) {
    return (
        `<div class="flex-item">
            <span-${status}>${title}</span-${status}>
            <ul class="task-list task-list-${status}"></ul>
        </div>`
    );
}

export default class TaskListComponent {
    constructor({title, status}) {
        this.title = title;
        this.status = status;
        this.element = null;
        this.tasksContainer = null;
    }

    getTemplate() {
        return createTaskListComponentTemplate(this.title, this.status);
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
            this.tasksContainer = this.element.querySelector(`.task-list-${this.status}`);
        }
        return this.element;
    }

    getTasksContainer() {
        if (!this.tasksContainer) {
            this.getElement();
        }
        return this.tasksContainer;
    }

    getButtonContainer() {
        if (!this.element) {
            this.getElement();
        }
        return this.element;
    }

    removeElement() {
        this.element = null;
        this.tasksContainer = null;
    }
}