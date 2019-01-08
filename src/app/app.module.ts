import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { components } from './components';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, ...components],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxSmartModalModule.forRoot(),
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    DeviceDetectorModule.forRoot(),
  ],
  providers: [],
})
export class AppModule {}
