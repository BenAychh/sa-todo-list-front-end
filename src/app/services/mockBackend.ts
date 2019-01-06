import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ITodo } from '../models/todo';

@Injectable()
export class MockBackendForTesting implements HttpInterceptor {
  todos: Record<number, ITodo> = {
    1: {
      complete: false,
      description: 'todo one',
      id: 1,
    },
    2: {
      complete: true,
      description: 'todo two',
      id: 2,
    },
    3: {
      complete: false,
      description: 'todo three',
      id: 3,
    },
  };

  nextId = 4;

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(null).pipe(
      mergeMap(
        (): Observable<any> => {
          // Get todos
          if (request.url.endsWith('/') && request.method === 'GET') {
            return of(
              new HttpResponse({
                body: {
                  data: Reflect.ownKeys(this.todos).map((key) => ({ ...this.todos[key] })),
                  error: null,
                  status: 'ok',
                },
                status: 200,
              }),
            );
          }

          // Create todo
          if (request.url.endsWith('/') && request.method === 'POST') {
            const newTodo: ITodo = {
              complete: false,
              description: request.body.description,
              id: this.nextId,
            };
            this.todos[this.nextId] = newTodo;
            this.nextId++;
            return of(
              new HttpResponse({
                body: {
                  data: { ...newTodo },
                  error: null,
                  status: 'ok',
                },
                status: 200,
              }),
            );
          }

          const lastCharacter = request.url[request.url.length - 1];

          // Update todo (only supports up to 10 todos for testing)
          if (isNumeric(lastCharacter) && request.method === 'PATCH') {
            const id = lastCharacter;
            this.todos[id] = {
              ...this.todos[id],
              ...request.body,
            };

            return of(
              new HttpResponse({
                body: {
                  data: { ...this.todos[id] },
                  error: null,
                  status: 'ok',
                },
                status: 200,
              }),
            );
          }

          if (isNumeric(lastCharacter) && request.method === 'DELETE') {
            const id = lastCharacter;
            delete this.todos[id];

            return of(
              new HttpResponse({
                body: {
                  data: null,
                  error: null,
                  status: 'ok',
                },
                status: 200,
              }),
            );
          }

          return of(
            new HttpResponse({
              body: {
                data: null,
                error: 'Not Found',
                status: 'error',
              },
              status: 404,
            }),
          );
        },
      ),
    );
  }
}

export const mockBackendForTestingProvider = {
  multi: true,
  provide: HTTP_INTERCEPTORS,
  useClass: MockBackendForTesting,
};

function isNumeric(s: any): s is number {
  return !isNaN(s - parseFloat(s));
}
