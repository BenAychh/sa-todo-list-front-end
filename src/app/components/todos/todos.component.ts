import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-todos',
  styleUrls: ['./todos.component.scss'],
  templateUrl: './todos.component.html',
})
export class TodosComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
