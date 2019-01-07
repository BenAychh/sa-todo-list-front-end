class Config {
  get apiUrl(): string {
    switch (window.location.hostname) {
      case 'localhost':
        switch (window.location.port) {
          case '4201':
            return 'http://localhost:8001/v1/';
          default:
            return 'http://localhost:8000/v1/';
        }
    }
    return 'http://localhost:8000/v1/';
  }
}

export const config = new Config();
