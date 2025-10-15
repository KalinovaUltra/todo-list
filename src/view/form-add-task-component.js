import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFormAddTaskComponentTemplate() {
    return (
        `<div>
        <li class="new-task"><b>Новая задача</b></li>
        <input type="text" value= "Название задачи"class="task-input" id="add-task" id="add-task">     
        <button type="button" class="button-add">Добавить</button></div>`
      );
}
export default class FormComponent extends AbstractComponent{
  #handleClick = null 
  
  constructor({onClick}){
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template(){
        return createFormAddTaskComponentTemplate();
  }

  #clickHandler = (evt) => {
    if (evt.target.classList.contains('button-add')) {
      evt.preventDefault();
      this.#handleClick();
    }
  };
}
