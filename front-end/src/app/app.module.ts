import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import {WeatherComponent} from './weather/weather.component';
import {SharedModule} from './shared/shared.module';
import {WeatherDetailsComponent} from './weather-details/weather-details.component';
import { WeatherIconComponent } from './weather-icon/weather-icon.component';
import { createCustomElement } from "@angular/elements";
import { UsertableComponent } from './components/usertable/usertable.component';
import { MatTableModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    WeatherComponent,
    WeatherDetailsComponent,
    WeatherIconComponent,
    UsertableComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [],
  entryComponents: [
    WeatherComponent,
    UsertableComponent
  ],
})
export class AppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    // const weatherElement = createCustomElement(WeatherComponent, {injector: this.injector });
    // customElements.define('weather-ng', <any>weatherElement);
    const provisionDashboardElement = createCustomElement(UsertableComponent, {injector: this.injector });
    customElements.define('weather-ng', <any>provisionDashboardElement);
  }
}
