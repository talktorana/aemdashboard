import {Component, Input, OnInit} from '@angular/core';
import {WeatherItem} from '../shared/models/weather.item';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {

  @Input() details: WeatherItem[] = [];

  constructor() { }

  ngOnInit() {
  }

}
