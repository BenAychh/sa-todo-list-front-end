import { HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgxSmartModalComponent, NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { ITodo } from '../../models/todo';
import { mockBackendForTestingProvider } from '../../services/mockBackend';
import { TodoService } from '../../services/todo.service';
import { TodoComponent } from './todo.component';

@Component({
  template: `
    <app-todo #realComponent [todo]="todo"></app-todo>
  `,
})
export class MockTestComponent {
  @ViewChild('realComponent') realComponent: TodoComponent;
  todo: ITodo = {
    complete: false,
    description: 'some todo',
    id: 1,
  };
}

describe('TodoComponent', () => {
  let component: MockTestComponent;
  let fixture: ComponentFixture<MockTestComponent>;
  let service: TodoService;
  let modalService: NgxSmartModalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockTestComponent, TodoComponent],
      imports: [HttpClientModule, NgxSmartModalModule.forRoot(), FormsModule],
      providers: [mockBackendForTestingProvider],
    }).compileComponents();
    service = TestBed.get(TodoService);
    modalService = TestBed.get(NgxSmartModalService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays the todo description', () => {
    const ne: HTMLElement = fixture.nativeElement;
    const description = ne.querySelector('.todo-description');

    expect(description.innerHTML).toEqual(component.todo.description);
  });

  it('starts with the class showActions not added', () => {
    const ne: HTMLElement = fixture.nativeElement;
    const todoBody = ne.querySelector('.todo-body');

    expect(todoBody.className).not.toContain('show-actions');
  });

  it('can toggle show actions by clicking on the description', () => {
    const ne: HTMLElement = fixture.nativeElement;
    const description: HTMLElement = ne.querySelector('.todo-description');
    description.click();
    fixture.detectChanges();

    const todoBody = ne.querySelector('.todo-body');

    expect(todoBody.className).toContain('show-actions');
  });

  it('crosses out the completed todos', () => {
    const ne: HTMLElement = fixture.nativeElement;
    const description: HTMLElement = ne.querySelector('.todo-description');
    component.todo = {
      complete: true,
      description: 'some todo',
      id: 1,
    };
    fixture.detectChanges();

    expect(description.className).toContain('completed-todo');
  });

  it('calls delete when the delete button is clicked', () => {
    const ne: HTMLElement = fixture.nativeElement;
    const del: HTMLElement = ne.querySelector('.todo-delete');
    spyOn(service, 'deleteTodo');

    del.click();

    expect(service.deleteTodo).toHaveBeenCalledWith(1);
  });

  it('calls toggleComplete when the checkbox is clicked', () => {
    const ne: HTMLElement = fixture.nativeElement;
    const toggle: HTMLElement = ne.querySelector('.todo-complete');
    spyOn(service, 'toggleComplete');

    toggle.click();

    expect(service.toggleComplete).toHaveBeenCalledWith(1);
  });

  it('opens the edit modal when the button is clicked', () => {
    spyOn(modalService, 'get').and.callThrough();
    spyOn(NgxSmartModalComponent.prototype, 'open').and.callThrough();
    const ne: HTMLElement = fixture.nativeElement;

    const addButton: HTMLElement = ne.querySelector('.todo-edit');
    addButton.click();

    expect(modalService.get).toHaveBeenCalledWith('edit_1');
    expect(NgxSmartModalComponent.prototype.open).toHaveBeenCalled();
  });

  it('updates the todo when the commitChange function is called', () => {
    spyOn(service, 'updateDescription');

    component.realComponent.newDescription = 'a new description';

    component.realComponent.commitChange();

    expect(service.updateDescription).toHaveBeenCalledWith(1, 'a new description');
  });

  it('closes the modal when commitChange is called', () => {
    spyOn(modalService, 'get').and.callThrough();
    spyOn(NgxSmartModalComponent.prototype, 'close').and.callThrough();

    component.realComponent.newDescription = 'a new todo';

    component.realComponent.commitChange();

    expect(modalService.get).toHaveBeenCalledWith('edit_1');
    expect(NgxSmartModalComponent.prototype.close).toHaveBeenCalled();
  });

  it('submits the form when the enter button is pressed', () => {
    spyOn(component.realComponent, 'commitChange');

    component.realComponent.onKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(component.realComponent.commitChange).toHaveBeenCalled();
  });

  it('does nothing if a key other than enter is pressed', () => {
    spyOn(component.realComponent, 'commitChange');

    component.realComponent.onKeydown(new KeyboardEvent('keydown', { key: 'Space' }));

    expect(component.realComponent.commitChange).not.toHaveBeenCalled();
  });
});
