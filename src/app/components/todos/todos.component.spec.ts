import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { mockBackendForTestingProvider } from '../../services/mockBackend';
import { TodoComponent } from '../todo/todo.component';
import { TodosComponent } from './todos.component';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodosComponent, TodoComponent],
      imports: [HttpClientModule],
      providers: [mockBackendForTestingProvider],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
