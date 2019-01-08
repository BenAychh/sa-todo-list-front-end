import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { TodoService } from '../../services/todo.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-add-todo',
  styleUrls: ['./add-todo.component.scss'],
  templateUrl: './add-todo.component.html',
})
export class AddTodoComponent implements OnInit {
  @ViewChild('input') input: ElementRef;

  TODO_MODAL_NAME = 'NEW_TODO';
  newDescription = '';
  constructor(private todoService: TodoService, public ngxSmartModalService: NgxSmartModalService) {}

  ngOnInit() {}

  startNewTodo() {
    this.newDescription = '';
    this.ngxSmartModalService.get(this.TODO_MODAL_NAME).open();
    // Force next tick
    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 0);
  }

  addNewTodo() {
    this.todoService.createTodo(this.newDescription);
    this.newDescription = '';
    this.ngxSmartModalService.get(this.TODO_MODAL_NAME).close();
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.addNewTodo();
    }
  }
}
