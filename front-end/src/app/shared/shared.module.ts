import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WeatherService} from './services/weather.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {WeatherInterceptor} from './interceptor/weather.interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    WeatherService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WeatherInterceptor,
      multi: true
    }
  ]
})
export class SharedModule { }
