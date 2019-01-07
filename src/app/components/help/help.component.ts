import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-help',
  styleUrls: ['./help.component.scss'],
  templateUrl: './help.component.html',
})
export class HelpComponent implements OnInit {
  HELP_MODAL_NAME = 'HELP_MODAL';

  constructor(private ngxSmartModalService: NgxSmartModalService) {}

  ngOnInit() {}

  openHelp() {
    this.ngxSmartModalService.get(this.HELP_MODAL_NAME).open();
  }
}
