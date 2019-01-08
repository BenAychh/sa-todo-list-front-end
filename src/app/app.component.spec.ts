import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AppComponent } from './app.component';
import { components } from './components';
import { mockBackendForTestingProvider } from './services/mockBackend';
import { UiService } from './services/ui.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let service: UiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, ...components],
      imports: [HttpClientModule, NgxSmartModalModule.forRoot(), FormsModule, DeviceDetectorModule.forRoot()],
      providers: [mockBackendForTestingProvider],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    service = TestBed.get(UiService);
  }));

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('has a header of All Todos when ui.showCompleted is true', async(() => {
    service.setShowCompleted(true);
    fixture.detectChanges();

    const ne: HTMLElement = fixture.nativeElement;
    const header: HTMLElement = ne.querySelector('header');

    expect(header.innerText).toContain('All Todos');
  }));

  it('has a header of Incomplete Todos when ui.showCompleted is false', async(() => {
    service.setShowCompleted(false);
    fixture.detectChanges();

    const ne: HTMLElement = fixture.nativeElement;
    const header: HTMLElement = ne.querySelector('header');

    expect(header.innerText).toContain('Incomplete Todos');
  }));
});
