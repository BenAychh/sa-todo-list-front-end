import { HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { components } from './components';
import { mockBackendForTestingProvider } from './services/mockBackend';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, ...components],
      imports: [HttpClientModule],
      providers: [mockBackendForTestingProvider],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
