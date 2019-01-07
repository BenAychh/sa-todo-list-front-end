import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ITodo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-todo',
  styleUrls: ['./todo.component.scss'],
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
  @Input()
  todo: ITodo;

  showActions = false;

  constructor(private todoService: TodoService) {}

  ngOnInit() {}

  toggleActions() {
    this.showActions = !this.showActions;
  }

  deleteTodo() {
    this.todoService.deleteTodo(this.todo.id);
  }

  toggleTodoCompletion() {
    this.todoService.toggleComplete(this.todo.id);
  }
}
