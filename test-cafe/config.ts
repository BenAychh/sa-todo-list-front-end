class Config {
  private defaultUrl = 'http://localhost:4200';

  private _baseUrl: string;

  constructor() {
    this._baseUrl = process.env.TODO_BASE_URL || this.defaultUrl;
  }

  get baseUrl() {
    console.log(this._baseUrl);
    return this._baseUrl;
  }
}

export const config = new Config();
