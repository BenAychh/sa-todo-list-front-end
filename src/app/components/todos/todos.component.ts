import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITodo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import { UiService } from '../../services/ui.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-todos',
  styleUrls: ['./todos.component.scss'],
  templateUrl: './todos.component.html',
})
export class TodosComponent implements OnInit {
  todos$: Observable<ITodo[]>;
  constructor(private todoService: TodoService, private uiService: UiService) {}

  ngOnInit() {
    this.todos$ = combineLatest(this.todoService.todos$, this.uiService.ui$).pipe(
      map(([todos, ui]) => {
        if (ui.showCompleted) {
          return todos;
        }
        return todos.filter((todo) => todo.complete === false);
      }),
    );
  }

  trackByFn(_: number, todo: ITodo) {
    return todo.id;
  }
}
