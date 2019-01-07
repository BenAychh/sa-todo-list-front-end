import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-todos',
  styleUrls: ['./todos.component.scss'],
  templateUrl: './todos.component.html',
})
export class TodosComponent implements OnInit {
  todos$: Observable<ITodo[]>;
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todos$ = this.todoService.todos;
  }

  trackByFn(_: number, todo: ITodo) {
    return todo.id;
  }
}
