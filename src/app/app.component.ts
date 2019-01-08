import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUserInterface } from './models/ui';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  ui$: Observable<IUserInterface>;

  get headerText(): Observable<string> {
    return this.ui$.pipe(
      map((ui) => {
        if (ui.showCompleted) {
          return 'All Todos';
        }
        return 'Incomplete Todos';
      }),
    );
  }

  constructor(private uiService: UiService, private deviceService: DeviceDetectorService) {}

  ngOnInit() {
    this.ui$ = this.uiService.ui$;
  }

  useIphoneClass() {
    return this.deviceService.browser === 'Safari' && this.deviceService.isMobile();
  }
}
