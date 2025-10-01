import TaskListComponent from '../view/task-list-component.js';
import BoardComponent from '../view/board-component.js';
import {render} from '../framework/render.js';
import TaskComponent from '../view/task-component.js';
import {Status, StatusLabel} from '../const.js';
import ButtonDelComponent from '../view/button-del-component.js';

export default class TaskBoardPresenter{
    #boardContainer = null;
    #taskModel = null;
    #boardComponent = new BoardComponent();
    #boardTasks = [];
    
    constructor ({boardContainer, taskModel}){
        this.#boardContainer = boardContainer;
        this.#taskModel = taskModel;
    }
    
    init (){
        this.#boardTasks = [...this.#taskModel.getTasks()];
        render(this.#boardComponent, this.#boardContainer);

        const taskListComponentBacklog = new TaskListComponent({title: StatusLabel[Status.BACKLOG], status: Status.BACKLOG});
        const taskListComponentProcess = new TaskListComponent({title: StatusLabel[Status.PROCESS], status: Status.PROCESS});
        const taskListComponentDone = new TaskListComponent({title: StatusLabel[Status.DONE], status: Status.DONE});
        const taskListComponentBin = new TaskListComponent({title: StatusLabel[Status.BIN], status: Status.BIN});

        render(taskListComponentBacklog, this.#boardComponent.getElement());
        render(taskListComponentProcess, this.#boardComponent.getElement());
        render(taskListComponentDone, this.#boardComponent.getElement());
        render(taskListComponentBin, this.#boardComponent.getElement());

        const buttonDelComponent= new ButtonDelComponent();
        render(buttonDelComponent, taskListComponentBin.getButtonContainer());

        for(let i = 0; i < this.#boardTasks.length; i++){
            if(this.#boardTasks[i].status === Status.BACKLOG){
                const taskComponent = new TaskComponent({task: this.#boardTasks[i]});
                render(taskComponent, taskListComponentBacklog.getTasksContainer());
            }
            if(this.#boardTasks[i].status === Status.PROCESS){
                const taskComponent = new TaskComponent({task: this.#boardTasks[i]});
                render(taskComponent, taskListComponentProcess.getTasksContainer());
            }
            if(this.#boardTasks[i].status === Status.DONE){
                const taskComponent = new TaskComponent({task: this.#boardTasks[i]});
                render(taskComponent, taskListComponentDone.getTasksContainer());
            }
            if(this.#boardTasks[i].status === Status.BIN){
                const taskComponent = new TaskComponent({task: this.#boardTasks[i]});
                render(taskComponent, taskListComponentBin.getTasksContainer());
            }
        }
    }
}