import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserInterface } from './models/ui';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  ui$: Observable<IUserInterface>;

  constructor(private uiService: UiService) {}

  ngOnInit() {
    this.ui$ = this.uiService.ui$;
  }
}
