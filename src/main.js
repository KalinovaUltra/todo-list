import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskListComponent from './view/task-list-component.js';
import BoardComponent from './view/board-component.js';
import {render} from './framework/render.js';
import TaskComponent from './view/task-component.js';

const bodyContainer = document.querySelector('.heading');
const formContainer = document.querySelector('.add-task');
const mainContainer = document.querySelector('.board-container'); 

render(new HeaderComponent(), bodyContainer);
render(new FormAddTaskComponent(), formContainer);

const boardComponent = new BoardComponent();
render(boardComponent, mainContainer); 

let j=0;
let i = 0;
for(i = 0; i < 4; i++){
    let taskListComponent = new TaskListComponent();
    render(taskListComponent, boardComponent.getElement()); 
    for(j = 0; j < 3; j++){
        render(new TaskComponent(), taskListComponent.getElement());
    }
}