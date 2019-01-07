import { TestBed } from '@angular/core/testing';

import { NetworkActiveService } from './network-active.service';

describe('NetworkActiveService', () => {
  let service: NetworkActiveService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(NetworkActiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start false', () => {
    service.active$.subscribe((active) => {
      expect(active).toBe(false);
    });
  });

  it('can flip network active to true', () => {
    service.networkActive();
    service.active$.subscribe((active) => {
      expect(active).toBe(true);
    });
  });

  it('can flip network back to false', () => {
    service.networkActive();
    service.networkInactive();
    service.active$.subscribe((active) => {
      expect(active).toBe(false);
    });
  });
});
