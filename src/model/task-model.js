import Observable from '../framework/observable.js';
import { UserAction, UpdateType } from '../const.js';
import {generateID} from '../utils.js'

export default class TaskModel extends Observable{
    #boardTasks = [];
    #observers = [];
    #tasksApiService = null;
    constructor({tasksApiService}) {
        super();
        this.#tasksApiService = tasksApiService;
 }

   async init() {
   try {
     const tasks = await this.#tasksApiService.tasks;
     this.#boardTasks = tasks;
   } catch(err) {
     this.#boardTasks = [];
   }
   this._notify(UpdateType.INIT);
 }

    get tasks(){
        return this.#boardTasks;
    }

    getTasksByStatus(status){
        return this.#boardTasks.filter(task => task.status === status);
    }

    async addTask(title) {
   const newTask = {
     title,
     status: 'backlog',
     id: generateID(),
   };
   try {
     const createdTask = await this.#tasksApiService.addTask(newTask);
     this.#boardTasks.push(createdTask);
     this._notify(UserAction.ADD_TASK, createdTask);
     return createdTask;
   } catch (err) {
     console.error('Ошибка при добавлении задачи на сервер:', err);
     throw err;
   }
 }

    deleteTask(taskId){
      this.#boardTasks = this.#boardTasks.filter(task => task.id !== taskId);
      this._notify(UserAction.DELETE_TASK, {id: taskId});
    }

    async clearBinModel(){
        const binTasks = this.#boardTasks.filter(task => task.status === 'bin');
        try{
          await Promise.all(binTasks.map(task => this.#tasksApiService.deleteTask(task.id)));

          this.#boardTasks = this.#boardTasks.filter(task => task.status !== 'bin');
          this._notify(UserAction.DELETE_TASK, {status: 'bin'});
        } catch(err){
          console.error('Ошибка при удалении задач из корзины на сервере:', err);
          throw err;
        }
    }

    hasBinTasks() {
        return this.#boardTasks.some(task => task.status === "bin");
    }
    

async updateTaskStatus(taskId, newStatus){
    const task = this.#boardTasks.find(task => task.id === taskId);
    if(task){
        const previousStatus = task.status;
        task.status = newStatus;

        try{
            const updatedTask = await this.#tasksApiService.updateTask(task);
            Object.assign(task, updatedTask);
            this._notify(UserAction.UPDATE_TASK, task);
        } catch(err){
            console.error('Ошибка при обновлении статуса задачи на сервере: ', err);
            task.status = previousStatus;
            throw err;
        }
    }
}
}
