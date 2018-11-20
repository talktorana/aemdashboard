import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import {WeatherComponent} from './weather/weather.component';
import {SharedModule} from './shared/shared.module';
import {WeatherDetailsComponent} from './weather-details/weather-details.component';
import { WeatherIconComponent } from './weather-icon/weather-icon.component';
import { createCustomElement } from "@angular/elements";
import { UsertableComponent } from './components/dashboard/dashboard.component';
import { MatTableModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StackedDashboardComponent } from './components/stackedDashboard/stacked.dashboard.component'
import {CoursesService} from "./services/courses.service";
import {BrandService} from "./services/brand.service";
import {
  MatGridListModule,
  MatToolbarModule,
} from '@angular/material';



@NgModule({
  declarations: [
    WeatherComponent,
    WeatherDetailsComponent,
    WeatherIconComponent,
    UsertableComponent,
    StackedDashboardComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatToolbarModule,
    MatGridListModule,
  ],
  providers: [CoursesService,BrandService],
  entryComponents: [
    WeatherComponent,
    UsertableComponent,
    StackedDashboardComponent
  ],
})
export class AppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    // const weatherElement = createCustomElement(WeatherComponent, {injector: this.injector });
    // customElements.define('weather-ng', <any>weatherElement);
    const provisionDashboardElement = createCustomElement(StackedDashboardComponent, {injector: this.injector });
    customElements.define('weather-ng', <any>provisionDashboardElement);
  }
}
