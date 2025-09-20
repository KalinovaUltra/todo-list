import {createElement} from '../framework/render.js';


function createFormAddTaskComponentTemplate() {
    return (
        `<div>
        <li class="new-task"><b>Новая задача</b></li>
        <input type="text" value= "Название задачи"class="task-input" >     
        <button type="button" class="button-add">Добавить</button></div>`
      );
}


export default class FormAddTaskComponent {
  getTemplate() {
    return createFormAddTaskComponentTemplate();
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
