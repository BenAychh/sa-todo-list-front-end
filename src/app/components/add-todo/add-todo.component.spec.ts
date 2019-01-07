import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgxSmartModalComponent, NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { mockBackendForTestingProvider } from '../../services/mockBackend';
import { TodoService } from '../../services/todo.service';
import { AddTodoComponent } from './add-todo.component';

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;
  let modalService: NgxSmartModalService;
  let todoService: TodoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddTodoComponent],
      imports: [NgxSmartModalModule.forRoot(), FormsModule, HttpClientModule],
      providers: [mockBackendForTestingProvider],
    }).compileComponents();
    modalService = TestBed.get(NgxSmartModalService);
    todoService = TestBed.get(TodoService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('opens the add modal when the button is clicked', () => {
    spyOn(modalService, 'get').and.callThrough();
    spyOn(NgxSmartModalComponent.prototype, 'open').and.callThrough();
    const ne: HTMLElement = fixture.nativeElement;

    const addButton: HTMLElement = ne.querySelector('.add-todo');
    addButton.click();

    expect(modalService.get).toHaveBeenCalledWith(component.TODO_MODAL_NAME);
    expect(NgxSmartModalComponent.prototype.open).toHaveBeenCalled();
  });

  it('creates the todo when addNewTodo is called', () => {
    spyOn(todoService, 'createTodo');

    component.newDescription = 'a new todo';

    component.addNewTodo();

    expect(todoService.createTodo).toHaveBeenCalledWith('a new todo');
  });

  it('closes the modal when addNewTodo is called', () => {
    spyOn(modalService, 'get').and.callThrough();
    spyOn(NgxSmartModalComponent.prototype, 'close').and.callThrough();

    component.newDescription = 'a new todo';

    component.addNewTodo();

    expect(modalService.get).toHaveBeenCalledWith(component.TODO_MODAL_NAME);
    expect(NgxSmartModalComponent.prototype.close).toHaveBeenCalled();
  });

  it('submits the form when the enter button is pressed', () => {
    spyOn(component, 'addNewTodo');

    component.onKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(component.addNewTodo).toHaveBeenCalled();
  });

  it('does nothing if a key other than enter is pressed', () => {
    spyOn(component, 'addNewTodo');

    component.onKeydown(new KeyboardEvent('keydown', { key: 'Space' }));

    expect(component.addNewTodo).not.toHaveBeenCalled();
  });
});
