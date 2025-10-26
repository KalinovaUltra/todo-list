import BoardComponent from '../view/board-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import { render } from "../framework/render.js";
import {Status, StatusLabel, UserAction, UpdateType} from '../const.js';
import ButtonDelComponent from '../view/button-del-component.js'; 
import PlugComponent from '../view/plug-component.js';
import LoadingViewComponent from '../view/loading-view-component.js';

export default class TaskBoardPresenter{
    #boardComponent = new BoardComponent(); 
    #tasksModel = null;
    #boardContainer = null;
    #boardTasks = [];
    #clearButton = null;
    #loadingComponent = new LoadingViewComponent();

    constructor({boardContainer, tasksModel, clearButton}){
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel; 
        this.#clearButton = clearButton;
        

       
        this.#tasksModel.addObserver(this.#handleModelEvent.bind(this));
    }

    async init() {
        render(this.#loadingComponent, this.#boardContainer);
        await this.#tasksModel.init();
        this.#clearBoard();
        this.#renderBoard();
    }

    #renderTask(task, container){
        const taskComponent = new TaskComponent({task: task});
        render(taskComponent, container);
    }

    #renderClearButton(container){
    const buttonComponent = new ButtonDelComponent({ 
        onClick: () => this.#handleClearBinClick() 
    });
    render(buttonComponent, container);
    
    this.#buttonDisable();
}

    #renderPlugElement(container){
        render(new PlugComponent(), container);
    }
    
    #filterByStatus(tasks, status){
        return tasks.filter(x => {
            return x.status == status;
        });
    }

async #handleTaskDrop(taskId, newStatus, insertIndex = null){
    try{
        await this.#tasksModel.updateTaskStatus(taskId, newStatus, insertIndex);
    } catch(err){
        console.error('Ошибка при обновлении статуса задачи на сервере: ', err)
    }
}

    #renderBoard(){
        render(this.#boardComponent, this.#boardContainer);

    Object.values(Status).forEach((status) => {
        const taskListComponent = new TaskListComponent({status: status, label: StatusLabel[status],
            onTaskDrop: this.#handleTaskDrop.bind(this)});
        render(taskListComponent, this.#boardComponent.element);
        const tasksForStatus = this.#filterByStatus(this.tasks, status); 
        if(tasksForStatus.length == 0){
            this.#renderPlugElement(taskListComponent.element);
        }
        tasksForStatus.forEach((task) => {
            this.#renderTask(task, taskListComponent.element);
        })
        if(status == "bin"){ 
            this.#renderClearButton(taskListComponent.element); 
        }
    })
    }

    async createTask(){
        const taskTitle = document.getElementById('add-task').value.trim();
        if(!taskTitle){
            return;
        }
        try{
            await this.#tasksModel.addTask(taskTitle);
            document.getElementById('add-task').value = "";
        } catch(err){
            console.error('Ошибка при создании задачи:', err)
        }
    }

    #clearBin(){
    this.#tasksModel.clearBinModel();
}

async #handleClearBinClick(){
        try{
            await this.#tasksModel.clearBinModel();
        } catch(err){
            console.error('Ошибка при очистке корзины', err);
        }
    }

    #clearBoard(){
        this.#boardComponent.element.innerHTML = '';
        if (this.#loadingComponent.element && this.#loadingComponent.element.parentNode) {
            this.#loadingComponent.element.remove();
        }
    }


    #buttonDisable(){
        const binTasks = this.#filterByStatus(this.tasks, 'bin');
        const clearButton = document.querySelector('.button-del');
        
        if (clearButton) {
            clearButton.disabled = binTasks.length === 0;
        }
    }

    get tasks(){
        return this.#tasksModel.tasks;
    }
#handleModelEvent(event, payload){
    switch(event){
        case UserAction.ADD_TASK:
        case UserAction.UPDATE_TASK:
        case UserAction.DELETE_TASK:
        case UpdateType.INIT:
            this.#clearBoard();
            this.#renderBoard();
            this.#buttonDisable();
            break;
    }
}
}