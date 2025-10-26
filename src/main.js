import HeaderComponent from './view/header-component.js';
import FormComponent from './view/form-add-task-component.js';
import TaskBoardPresenter from './presenter/task-board-presenter.js';
import { RenderPosition, render } from "./framework/render.js";
import TaskModel from './model/task-model.js';
import TasksApiService from './tasks-api-service.js';


const END_POINT = "https://68fe247c7c700772bb12ed1f.mockapi.io"
const taskModel = new TaskModel({tasksApiService: new TasksApiService(END_POINT)});
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