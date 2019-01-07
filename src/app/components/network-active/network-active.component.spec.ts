import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkActiveService } from '../../services/network-active.service';
import { NetworkActiveComponent } from './network-active.component';

describe('NetworkActiveComponent', () => {
  let component: NetworkActiveComponent;
  let fixture: ComponentFixture<NetworkActiveComponent>;
  let service: NetworkActiveService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NetworkActiveComponent],
    }).compileComponents();
    service = TestBed.get(NetworkActiveService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the loader when the network is active', () => {
    service.networkActive();
    fixture.detectChanges();

    const ne: HTMLElement = fixture.nativeElement;
    const loader = ne.querySelector('.lds-roller');

    expect(loader).toBeTruthy();
  });

  it('does not show the loader when the network is inactive', () => {
    service.networkActive();
    fixture.detectChanges();
    service.networkInactive();
    fixture.detectChanges();

    const ne: HTMLElement = fixture.nativeElement;
    const loader = ne.querySelector('.lds-roller');

    expect(loader).toBeFalsy();
  });
});
