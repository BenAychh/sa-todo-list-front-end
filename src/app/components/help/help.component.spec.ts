import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSmartModalComponent, NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { HelpComponent } from './help.component';

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;
  let modalService: NgxSmartModalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HelpComponent],
      imports: [NgxSmartModalModule.forRoot()],
    }).compileComponents();
    modalService = TestBed.get(NgxSmartModalService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('opens the help modal when the button is clicked', () => {
    spyOn(modalService, 'get').and.callThrough();
    spyOn(NgxSmartModalComponent.prototype, 'open').and.callThrough();
    const ne: HTMLElement = fixture.nativeElement;

    const addButton: HTMLElement = ne.querySelector('.open-help');
    addButton.click();

    expect(modalService.get).toHaveBeenCalledWith(component.HELP_MODAL_NAME);
    expect(NgxSmartModalComponent.prototype.open).toHaveBeenCalled();
  });
});
