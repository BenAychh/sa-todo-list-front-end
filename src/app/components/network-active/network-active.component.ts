import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NetworkActiveService } from '../../services/network-active.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-network-active',
  styleUrls: ['./network-active.component.scss'],
  templateUrl: './network-active.component.html',
})
export class NetworkActiveComponent implements OnInit {
  networkActive$: Observable<boolean>;
  constructor(private networkActiveService: NetworkActiveService) {}

  ngOnInit() {
    this.networkActive$ = this.networkActiveService.active$;
  }
}
