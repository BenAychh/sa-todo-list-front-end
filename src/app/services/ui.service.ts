import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUserInterface } from '../models/ui';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  LEFT_HANDED = 'left-handed';
  SHOW_COMPLETED = 'show-completed';
  private _ui: BehaviorSubject<IUserInterface>;

  get ui() {
    return this._ui.asObservable();
  }

  constructor() {
    let leftHanded = false;
    const storageLeftHanded = localStorage.getItem(this.LEFT_HANDED);
    if (storageLeftHanded !== null) {
      leftHanded = String(storageLeftHanded) === 'true';
    } else {
      localStorage.setItem(this.LEFT_HANDED, String(leftHanded));
    }

    let showCompleted = true;
    const storageShowCompleted = localStorage.getItem(this.SHOW_COMPLETED);
    if (storageShowCompleted !== null) {
      showCompleted = String(storageShowCompleted) === 'true';
    } else {
      localStorage.setItem(this.SHOW_COMPLETED, String(showCompleted));
    }

    this._ui = new BehaviorSubject<IUserInterface>({ leftHanded, showCompleted });
  }

  setLeftHanded(leftHanded: boolean) {
    localStorage.setItem(this.LEFT_HANDED, String(leftHanded));
    this._ui.next({
      ...this._ui.value,
      leftHanded,
    });
  }

  setShowCompleted(showCompleted: boolean) {
    localStorage.setItem(this.SHOW_COMPLETED, String(showCompleted));
    this._ui.next({
      ...this._ui.value,
      showCompleted,
    });
  }
}
