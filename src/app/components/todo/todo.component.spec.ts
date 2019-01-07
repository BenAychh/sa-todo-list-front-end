import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ITodo } from '../../models/todo';
import { TodoComponent } from './todo.component';

@Component({
  template: `
    <app-todo [todo]="todo"></app-todo>
  `,
})
export class MockTestComponent {
  todo: ITodo = {
    complete: false,
    description: 'some todo',
    id: 1,
  };
}

describe('TodoComponent', () => {
  let component: MockTestComponent;
  let fixture: ComponentFixture<MockTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockTestComponent, TodoComponent],
    }).compileComponents();
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
});
