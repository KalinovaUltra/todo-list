import { task } from "../mock/task.js";

export default class TaskModel{
    #boardTasks = task; 

    get tasks(){ 
        return this.#boardTasks;
    }
}