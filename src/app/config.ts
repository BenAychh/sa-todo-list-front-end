class Config {
  get apiUrl(): string {
    let apiUrl = 'http://localhost:8000/v1/';
    if (window.location.hostname === 'localhost') {
      apiUrl = handleLocalHost();
    } else if (window.location.hostname === 'sa-todo-list.firebaseapp.com') {
      apiUrl = 'https://todoapi.benaychh.io/v1';
    }
    return apiUrl;
  }
}

function handleLocalHost() {
  if (window.location.port === '4201') {
    return 'http://localhost:8001/v1/';
  }
  return 'http://localhost:8000/v1/';
}

export const config = new Config();
