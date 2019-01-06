import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TodosComponent } from './components/todos/todos.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, TodosComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
})
export class AppModule {}
