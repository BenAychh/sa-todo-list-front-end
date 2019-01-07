import { NgModule } from '@angular/core';
import { components } from './components';
import { MockTestComponent } from './components/todo/todo.component.spec';

@NgModule({
  declarations: [MockTestComponent, ...components],
})
export class AppModule {}
