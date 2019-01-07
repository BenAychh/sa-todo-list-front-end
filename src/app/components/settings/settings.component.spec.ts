import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSmartModalComponent, NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { UiService } from '../../services/ui.service';
import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let modalService: NgxSmartModalService;
  let uiService: UiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      imports: [NgxSmartModalModule.forRoot()],
    }).compileComponents();
    modalService = TestBed.get(NgxSmartModalService);
    uiService = TestBed.get(UiService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('opens the settings', () => {
    spyOn(modalService, 'get').and.callThrough();
    spyOn(NgxSmartModalComponent.prototype, 'open').and.callThrough();

    const ne: HTMLElement = fixture.nativeElement;

    const open: HTMLElement = ne.querySelector('.settings');
    open.click();

    expect(modalService.get).toHaveBeenCalledWith(component.SETTINGS_MODAL_NAME);
    expect(NgxSmartModalComponent.prototype.open).toHaveBeenCalled();
  });

  it('updateShowCompleted updates the service', () => {
    spyOn(uiService, 'setShowCompleted');

    const fakeEvent = ({
      target: {
        checked: true,
      },
    } as any) as Event;

    component.updateShowCompleted(fakeEvent);

    expect(uiService.setShowCompleted).toHaveBeenCalledWith(true);
  });

  it('updateLeftHanded updates the service', () => {
    spyOn(uiService, 'setLeftHanded');

    const fakeEvent = ({
      target: {
        checked: true,
      },
    } as any) as Event;

    component.updateLeftHanded(fakeEvent);

    expect(uiService.setLeftHanded).toHaveBeenCalledWith(true);
  });
});
