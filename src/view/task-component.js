import {createElement} from '../framework/render.js'; 


function createTaskComponentTemplate() {
    return (
        `  <ul class = "task-list task-list-backlog">
    <li class="task-list-backlog">Выучить JS</li></ul>`
      );
}


export default class TaskComponent {
  getTemplate() {
    return createTaskComponentTemplate();
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
