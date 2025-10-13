import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFormAddTaskComponentTemplate() {
    return (
        `<div>
        <li class="new-task"><b>Новая задача</b></li>
        <input type="text" value= "Название задачи"class="task-input" >     
        <button type="button" class="button-add">Добавить</button></div>`
      );
}
export default class FormAddTaskComponent extends AbstractComponent{
  get template() {
    return createFormAddTaskComponentTemplate();
  }

}
