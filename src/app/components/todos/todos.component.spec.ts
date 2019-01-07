import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { mockBackendForTestingProvider } from '../../services/mockBackend';
import { UiService } from '../../services/ui.service';
import { TodoComponent } from '../todo/todo.component';
import { TodosComponent } from './todos.component';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let uiService: UiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodosComponent, TodoComponent],
      imports: [HttpClientModule, NgxSmartModalModule.forRoot(), FormsModule],
      providers: [mockBackendForTestingProvider],
    }).compileComponents();
    uiService = TestBed.get(UiService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows all todos when showCompleted is true', () => {
    uiService.setShowCompleted(true);

    component.todos$.subscribe((todos) => {
      expect(todos.length).toEqual(3);
    });
  });

  it('only shows incomplete todos when showCompleted is false', () => {
    uiService.setShowCompleted(false);

    component.todos$.subscribe((todos) => {
      expect(todos.every((todo) => !todo.complete)).toEqual(true);
    });
  });
});
