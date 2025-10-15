import HeaderComponent from './view/header-component.js';
import FormComponent from './view/form-add-task-component.js';
import TaskBoardPresenter from './presenter/task-board-presenter.js';
import { RenderPosition, render } from "./framework/render.js";
import TaskModel from './model/task-model.js';

const taskModel = new TaskModel();
const bodyContainer = document.querySelector('.heading');
const formContainer = document.querySelector('.add-task');
const taskBoardContainer = document.querySelector('.board-container'); 

const taskBoardPresenter = new TaskBoardPresenter({ 
    boardContainer: taskBoardContainer, 
    tasksModel: taskModel
});

const formAddTaskComponent = new FormComponent({
    onClick: handleNewTaskButtonClick
});

function handleNewTaskButtonClick(){
    taskBoardPresenter.createTask();
}

render(new HeaderComponent(), bodyContainer);
render(formAddTaskComponent, formContainer);

taskBoardPresenter.init();