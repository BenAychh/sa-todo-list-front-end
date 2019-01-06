import * as minimist from 'minimist';

class Config {
  private defaultUrl = 'http://localhost:4200';

  private _baseUrl: string;
  private _args: Record<string, string>;

  constructor() {
    this._args = minimist(process.argv.slice(2));
    this._baseUrl = this._args.baseUrl || this.defaultUrl;
  }

  get baseUrl() {
    return this._baseUrl;
  }
}

export const config = new Config();
