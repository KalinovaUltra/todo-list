import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskListComponentTemplate(title, status) {
    return (
        `<div class="flex-item">
            <span-${status}>${title}</span-${status}>
            <ul class="task-list task-list-${status}"></ul>
        </div>`
        
    );
}
export default class TaskListComponent extends AbstractComponent{

    constructor({status, label, onTaskDrop}){
      super();
        this.status = status;
        this.label = label;
        this.#setDropHandler(onTaskDrop);
    }

  get template(){
        return createTaskListComponentTemplate(this.label,this.status);
  }

  #setDropHandler(onTaskDrop){
    const container = this.element;
    const taskList = container.querySelector('ul');
    container.addEventListener('dragover', (event) => {
      event.preventDefault();
      const afterElement = this.#getDragAfterElement(taskList, event.clientY);
            const draggable = document.querySelector('.dragging');
            
            if (draggable) {
                if (afterElement == null) {
                    taskList.appendChild(draggable);
                } else {
                    taskList.insertBefore(draggable, afterElement);
                }
            }
        });
        
    container.addEventListener('drop', (event) => {
      event.preventDefault();
            const taskId = event.dataTransfer.getData('text/plain');
            const taskList = container.querySelector('ul');
            const tasks = Array.from(taskList.querySelectorAll('li'));
            const droppedElement = document.querySelector(`[draggable="true"]:last-child`);
            let insertIndex = tasks.length;
            
            if (droppedElement) {
                insertIndex = tasks.indexOf(droppedElement);
            }
            
            onTaskDrop(taskId, this.status, insertIndex);
        });
  }
  #getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];
        
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
}
