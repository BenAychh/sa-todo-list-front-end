import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AppComponent } from './app.component';
import { components } from './components';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, ...components],
  imports: [BrowserModule, HttpClientModule, NgxSmartModalModule.forRoot(), FormsModule],
  providers: [],
})
export class AppModule {}
