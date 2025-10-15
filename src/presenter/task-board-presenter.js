import BoardComponent from '../view/board-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import { render } from "../framework/render.js";
import {Status, StatusLabel} from '../const.js';
import ButtonDelComponent from '../view/button-del-component.js'; 
import PlugComponent from '../view/plug-component.js';

export default class TaskBoardPresenter{
    #boardComponent = new BoardComponent(); 
    #tasksModel = null;
    #boardContainer = null;
    #boardTasks = [];
    #clearButton = null;

    constructor({boardContainer, tasksModel, clearButton}){
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel; 
        this.#clearButton = clearButton;

       
        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
    }

    init(){
        this.#boardTasks = [...this.#tasksModel.tasks];
        this.#renderBoard();
    } 

    #renderTask(task, container){
        const taskComponent = new TaskComponent({task: task});
        render(taskComponent, container);
    }

    #renderClearButton(container){
    const buttonComponent = new ButtonDelComponent({ 
        onClick: () => this.#clearBin() 
    });
    render(buttonComponent, container);
    
    this.#buttonDisable;
}

    #renderPlugElement(container){
        render(new PlugComponent(), container);
    }
    
    #filterByStatus(tasks, status){
        return tasks.filter(x => {
            return x.status == status;
        });
    }

    #renderBoard(){
        render(this.#boardComponent, this.#boardContainer);

        Object.values(Status).forEach((status) => {
            const taskListComponent = new TaskListComponent({status: status, label: StatusLabel[status]});
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

    createTask(){
        const taskTitle = document.getElementById('add-task').value.trim();
        if(!taskTitle){
            return;
        }
        this.#tasksModel.addTask(taskTitle);
        document.getElementById('add-task').value = '';
    }

    #clearBin(){
        this.#tasksModel.clearBin();
    }

    #handleModelChange(){
        this.#clearBoard();
        this.#renderBoard();
        this.#buttonDisable(); 
    }

    #clearBoard(){
        this.#boardComponent.element.innerHTML = '';
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
}