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

    constructor({boardContainer, tasksModel}){
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel; 
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
        render(new ButtonDelComponent(), container);
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
            const tasksForStatus = this.#filterByStatus(this.#boardTasks, status);
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
}