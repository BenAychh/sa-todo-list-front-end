import { utils } from './utils';

class Config {
  get apiUrl(): string {
    let apiUrl = 'http://localhost:8000/v1/';
    if (utils.getWindow().location.hostname === 'localhost') {
      apiUrl = handleLocalHost();
    } else if (utils.getWindow().location.hostname === 'sa-todo-list.firebaseapp.com') {
      apiUrl = 'https://todoapi.benaychh.io/v1/';
    } else if (utils.getWindow().location.hostname === 'todo.benaychh.io') {
      apiUrl = 'https://todoapi.benaychh.io/v1/';
    }
    return apiUrl;
  }
}

function handleLocalHost() {
  if (utils.getWindow().location.port === '4201') {
    return 'http://localhost:8001/v1/';
  }
  return 'http://localhost:8000/v1/';
  // return 'https://todoapi.benaychh.io/v1/';
}

export const config = new Config();
