import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITodo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _todos = new BehaviorSubject<ITodo[]>([]);

  get todos() {
    return this._todos.asObservable();
  }

  constructor(private http: HttpClient) {
    this.loadTodos();
  }

  createTodo(description: string) {}

  toggleComplete(id: number) {}

  updateDescription(id: number, description: string) {}

  deleteTodo(id: number) {}

  private loadTodos() {}
}
