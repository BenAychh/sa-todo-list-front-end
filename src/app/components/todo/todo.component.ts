import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ITodo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-todo',
  styleUrls: ['./todo.component.scss'],
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
  @ViewChild('input') input: ElementRef;
  newDescription: string;

  @Input()
  todo: ITodo;

  showActions = false;

  constructor(private todoService: TodoService, public ngxSmartModalService: NgxSmartModalService) {}

  ngOnInit() {}

  toggleActions() {
    this.showActions = !this.showActions;
  }

  deleteTodo() {
    this.todoService.deleteTodo(this.todo.id);
  }

  toggleTodoCompletion() {
    this.showActions = false;
    this.todoService.toggleComplete(this.todo.id);
  }

  startEditing() {
    this.newDescription = this.todo.description;
    this.ngxSmartModalService.get(`edit_${this.todo.id}`).open();
    // Force next tick
    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 0);
  }

  commitChange() {
    this.showActions = false;
    this.todoService.updateDescription(this.todo.id, this.newDescription);
    this.ngxSmartModalService.get(`edit_${this.todo.id}`).close();
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.commitChange();
    }
  }
}
