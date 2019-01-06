import { HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { ITodo } from '../models/todo';
import { mockBackendForTestingProvider } from './mockBackend';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [mockBackendForTestingProvider],
    });
    service = TestBed.get(TodoService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('constructor', () => {
    it('Loads the list of todos on start', async(() => {
      service.todos.subscribe((todos) => {
        expect(todos.length).toEqual(3);
      });
    }));

    it('Orders the todos by id in descending order', async(() => {
      service.todos.subscribe((todos) => {
        const expected = [3, 2, 1];
        const actual = todos.map((todo) => todo.id);
        expect(actual).toEqual(expected);
      });
    }));
  });

  describe('createTodo', () => {
    it('creates the todo and adds it to the list', async(() => {
      service.createTodo('todo four');
      service.todos.subscribe((todos) => {
        const expected: ITodo = {
          complete: false,
          description: 'todo four',
          id: 4,
        };

        expect(todos[0]).toEqual(expected);
      });
    }));
  });

  describe('toggleComplete', () => {
    it('can switch an incomplete todo to complete', async(() => {
      service.toggleComplete(1);
      service.todos.subscribe((todos) => {
        const expected: ITodo = {
          complete: true,
          description: 'todo one',
          id: 1,
        };
        expect(todos[2]).toEqual(expected);
      });
    }));

    it('can switch a complete todo to incomplete', async(() => {
      service.toggleComplete(2);
      service.todos.subscribe((todos) => {
        const expected: ITodo = {
          complete: false,
          description: 'todo two',
          id: 2,
        };
        expect(todos[1]).toEqual(expected);
      });
    }));
  });

  describe('updateDescription', () => {
    it('can update the description to a todo', async(() => {
      service.updateDescription(3, 'new todo three description');
      service.todos.subscribe((todos) => {
        const expected: ITodo = {
          complete: false,
          description: 'new todo three description',
          id: 1,
        };

        expect(todos[0]).toEqual(expected);
      });
    }));
  });

  describe('deleteTodo', () => {
    it('can delete a todo', async(() => {
      service.deleteTodo(1);
      service.todos.subscribe((todos) => {
        const expected: ITodo[] = [
          {
            complete: false,
            description: 'todo three',
            id: 3,
          },
          {
            complete: true,
            description: 'todo two',
            id: 2,
          },
        ];

        expect(todos).toEqual(expected);
      });
    }));
  });
});
