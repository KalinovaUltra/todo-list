import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBoardPresenter from './presenter/task-board-presenter.js';
import { render, RenderPosition } from './framework/render.js';
import TaskModel from './model/task-model.js';

const taskModel = new TaskModel();
const bodyContainer = document.querySelector('.heading');
const formContainer = document.querySelector('.add-task');
const taskBoardContainer = document.querySelector('.board-container'); 

const taskBoardPresenter = new TaskBoardPresenter({ boardContainer: taskBoardContainer, taskModel});

render(new HeaderComponent(), bodyContainer);
render(new FormAddTaskComponent(), formContainer);

taskBoardPresenter.init();