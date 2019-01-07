import { TestBed } from '@angular/core/testing';
import { UiService } from './ui.service';

describe('UiService', () => {
  it('should be created', () => {
    TestBed.configureTestingModule({});
    const service: UiService = TestBed.get(UiService);
    expect(service).toBeTruthy();
  });

  it('defaults to false for leftHanded and true for showCompleted', () => {
    spyOn(localStorage, 'getItem').and.returnValues(null, null);
    TestBed.configureTestingModule({});
    const service: UiService = TestBed.get(UiService);
    service.ui.subscribe((ui) => {
      expect(ui).toEqual({ leftHanded: false, showCompleted: true });
    });
  });

  it('initializes the leftHanded with true if that is in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValues('true', null);
    TestBed.configureTestingModule({});
    const service: UiService = TestBed.get(UiService);
    service.ui.subscribe((ui) => {
      expect(ui).toEqual({ leftHanded: true, showCompleted: true });
    });
  });

  it('initializes the leftHanded with true if that is in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValues('false', null);
    TestBed.configureTestingModule({});
    const service: UiService = TestBed.get(UiService);
    service.ui.subscribe((ui) => {
      expect(ui).toEqual({ leftHanded: false, showCompleted: true });
    });
  });

  it('sets the local storage value for lefthanded if it is not set', () => {
    spyOn(localStorage, 'getItem').and.returnValues(null, null);
    spyOn(localStorage, 'setItem');
    TestBed.configureTestingModule({});
    const service: UiService = TestBed.get(UiService);
    expect(localStorage.setItem).toHaveBeenCalledWith(service.LEFT_HANDED, 'false');
  });

  it('initializes the showCompleted with false if that is in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValues(null, 'false');
    TestBed.configureTestingModule({});
    const service: UiService = TestBed.get(UiService);
    service.ui.subscribe((ui) => {
      expect(ui).toEqual({ leftHanded: false, showCompleted: false });
    });
  });

  it('initializes the showCompleted with true if that is in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValues(null, 'true');
    TestBed.configureTestingModule({});
    const service: UiService = TestBed.get(UiService);
    service.ui.subscribe((ui) => {
      expect(ui).toEqual({ leftHanded: false, showCompleted: true });
    });
  });

  it('sets the local storage value for showCompleted if it is not set', () => {
    spyOn(localStorage, 'getItem').and.returnValues(null, null);
    spyOn(localStorage, 'setItem');
    TestBed.configureTestingModule({});
    const service: UiService = TestBed.get(UiService);
    expect(localStorage.setItem).toHaveBeenCalledWith(service.SHOW_COMPLETED, 'true');
  });

  it('sets the leftHanded value', () => {
    spyOn(localStorage, 'setItem');
    TestBed.configureTestingModule({});
    const service: UiService = TestBed.get(UiService);
    service.setLeftHanded(true);
    service.ui.subscribe((ui) => {
      expect(ui).toEqual({ leftHanded: true, showCompleted: true });
    });
  });

  it('stores the leftHanded setting in local storage', () => {
    spyOn(localStorage, 'setItem');
    TestBed.configureTestingModule({});
    const service: UiService = TestBed.get(UiService);
    service.setLeftHanded(true);
    expect(localStorage.setItem).toHaveBeenCalledWith(service.LEFT_HANDED, 'true');
  });

  it('sets the showCompleted value', () => {
    spyOn(localStorage, 'setItem');
    TestBed.configureTestingModule({});
    const service: UiService = TestBed.get(UiService);
    service.setShowCompleted(false);
    service.ui.subscribe((ui) => {
      expect(ui).toEqual({ leftHanded: false, showCompleted: false });
    });
  });

  it('stores the showCompleted setting in local storage', () => {
    spyOn(localStorage, 'setItem');
    TestBed.configureTestingModule({});
    const service: UiService = TestBed.get(UiService);
    service.setShowCompleted(false);
    expect(localStorage.setItem).toHaveBeenCalledWith(service.SHOW_COMPLETED, 'false');
  });
});
