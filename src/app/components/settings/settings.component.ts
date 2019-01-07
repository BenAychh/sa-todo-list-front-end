import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Observable } from 'rxjs';
import { IUserInterface } from '../../models/ui';
import { UiService } from '../../services/ui.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-settings',
  styleUrls: ['./settings.component.scss'],
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  SETTINGS_MODAL_NAME = 'settings modal';
  ui$: Observable<IUserInterface>;

  constructor(private uiService: UiService, private ngxSmartModalService: NgxSmartModalService) {}

  ngOnInit() {
    this.ui$ = this.uiService.ui;
  }

  openSettings() {
    this.ngxSmartModalService.get(this.SETTINGS_MODAL_NAME).open();
  }

  updateShowCompleted(event: Event) {
    const target = event.target as HTMLInputElement;
    this.uiService.setShowCompleted(target.checked);
  }

  updateLeftHanded(event: Event) {
    const target = event.target as HTMLInputElement;
    this.uiService.setLeftHanded(target.checked);
  }
}
