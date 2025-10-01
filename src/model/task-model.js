import { task } from "../mock/task.js";

export default class TaskModel{
    #boardtask = task;

    getTasks(){
        return this.#boardtask;
    }
}