import { config } from './config';
import { utils } from './utils';

describe('config', () => {
  describe('apiUrl', () => {
    describe('localhost', () => {
      it('returns :8001 when using the :4201 port', () => {
        const fakeWindow = {
          location: {
            hostname: 'localhost',
            port: '4201',
          },
        };
        spyOn(utils, 'getWindow').and.returnValue(fakeWindow);

        expect(config.apiUrl).toEqual('http://localhost:8001/v1/');
      });

      it('returns :8000 for all ther ports', () => {
        const fakeWindow = {
          location: {
            hostname: 'localhost',
            port: '4200',
          },
        };
        spyOn(utils, 'getWindow').and.returnValue(fakeWindow);

        expect(config.apiUrl).toEqual('http://localhost:8000/v1/');
      });
    });
  });
  describe('sa-todo-list.firebaseapp.com', () => {
    it('returns https://todoapi.benaychh.io/v1/ when using the firebase url', () => {
      const fakeWindow = {
        location: {
          hostname: 'sa-todo-list.firebaseapp.com',
        },
      };
      spyOn(utils, 'getWindow').and.returnValue(fakeWindow);

      expect(config.apiUrl).toEqual('https://todoapi.benaychh.io/v1/');
    });
  });

  describe('todo.benaychh.io', () => {
    it('returns https://todoapi.benaychh.io/v1/ when using the firebase url', () => {
      const fakeWindow = {
        location: {
          hostname: 'todo.benaychh.io',
        },
      };
      spyOn(utils, 'getWindow').and.returnValue(fakeWindow);

      expect(config.apiUrl).toEqual('https://todoapi.benaychh.io/v1/');
    });
  });

  describe('everything else', () => {
    it('returns http://localhost:8000/v1/ when using the firebase url', () => {
      const fakeWindow = {
        location: {
          hostname: 'whargarbl',
        },
      };
      spyOn(utils, 'getWindow').and.returnValue(fakeWindow);

      expect(config.apiUrl).toEqual('http://localhost:8000/v1/');
    });
  });
});
