import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkActiveService {
  _active = new BehaviorSubject<boolean>(false);

  get active() {
    return this._active.asObservable();
  }

  constructor() {}

  networkActive() {
    this._active.next(true);
  }

  networkInactive() {
    this._active.next(false);
  }
}
