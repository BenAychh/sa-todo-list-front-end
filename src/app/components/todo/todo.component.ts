import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ITodo } from '../../models/todo';

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

  constructor() {}

  ngOnInit() {}

  toggleActions() {
    this.showActions = !this.showActions;
  }
}
