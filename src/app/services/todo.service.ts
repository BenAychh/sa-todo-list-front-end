import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { config } from '../config';
import { ITodo } from '../models/todo';
import { NetworkActiveService } from './network-active.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoMap: Record<number, ITodo> = {};

  private _todos = new BehaviorSubject<ITodo[]>([]);

  get todos() {
    return this._todos.asObservable();
  }

  constructor(private http: HttpClient, private networkActiveService: NetworkActiveService) {
    this.loadTodos();
  }

  createTodo(description: string) {
    this.networkActiveService.networkActive();
    this.http.post(config.apiUrl, { description }).subscribe((response: { data: ITodo }) => {
      this.todoMap[response.data.id] = response.data;
      this.dispatch();
    }, this.handleError);
  }

  toggleComplete(id: number) {
    this.networkActiveService.networkActive();
    const complete = !this.todoMap[id].complete;
    this.http.patch(`${config.apiUrl}/${id}`, { complete }).subscribe((response: { data: ITodo }) => {
      this.todoMap[response.data.id] = response.data;
      this.dispatch();
    }, this.handleError);
  }

  updateDescription(id: number, description: string) {
    this.networkActiveService.networkActive();
    this.http.patch(`${config.apiUrl}/${id}`, { description }).subscribe((response: { data: ITodo }) => {
      this.todoMap[response.data.id] = response.data;
      this.dispatch();
    }, this.handleError);
  }

  deleteTodo(id: number) {
    this.networkActiveService.networkActive();
    this.http.delete(`${config.apiUrl}/${id}`).subscribe(() => {
      delete this.todoMap[id];
      this.dispatch();
    }, this.handleError);
  }

  private handleError(err: Error) {
    console.error('An error occurred', err);
    this.networkActiveService.networkInactive();
  }

  private loadTodos() {
    this.http.get(config.apiUrl).subscribe((response: { data: ITodo[] }) => {
      this.todoMap = response.data.reduce((accumulator, todo) => {
        accumulator[todo.id] = todo;
        return accumulator;
      }, {});
      this.dispatch();
    });
  }

  private dispatch() {
    const todosSortedByIdDesc = Reflect.ownKeys(this.todoMap)
      .sort()
      .reverse()
      .map((key) => ({ ...this.todoMap[key] }));
    this._todos.next(todosSortedByIdDesc);
    this.networkActiveService.networkInactive();
  }
}
