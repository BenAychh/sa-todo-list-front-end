import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { components } from './components';
import { mockBackendForTestingProvider } from './services/mockBackend';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, ...components],
  imports: [BrowserModule, HttpClientModule],
  providers: [mockBackendForTestingProvider],
})
export class AppModule {}
