import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {WeatherService} from '../shared/services/weather.service';
import {WeatherResponse} from '../shared/models/weather.response';
import {DailyForecast} from '../shared/models/daily.forecast';
import {WeatherItem} from '../shared/models/weather.item';
// import {b} from '@angular/core/src/render3';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  // use input to pass config from AEM to angular app
  @Input() unit: string;

  public unitPostfix: string;

  public weatherForecast3Hourly: WeatherResponse;
  public weatherForecastDaily: DailyForecast[] = [];
  public weatherDetailsArray: WeatherItem[] = [];

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {

    switch (this.unit) {
      case 'imperial':
        this.unitPostfix = 'F';
        break;
      case 'metric':
        this.unitPostfix = 'C';
        break;
      default:
        this.unitPostfix = 'K';
    }

    navigator.geolocation.getCurrentPosition(
      (position: Position) => this.init(position.coords.latitude, position.coords.longitude),
        error => this.init(50.985996, 4.836522)
    );
  }

  private init(lat: number, long: number): void {
    this.weatherService.getForecast(lat, long, this.unit)
      .subscribe((res: WeatherResponse) => {
        this.weatherForecast3Hourly = res;
        this.generateDailyForecast();
      });
  }

  public getDetailsFor(date: Date): void {
    this.weatherDetailsArray = [];
    for (const item of this.weatherForecast3Hourly.list) {
      if (date.getDate() === item.date.getDate()) {
        this.weatherDetailsArray.push(item);
      }
    }
  }

  public getBackgroundImage(weatherType: string): string {
    let background = 'url(\'/etc/designs/ngx-aem/assets/img/';

    switch (weatherType) {
      case 'clear':
        background += 'sunny';
        break;
      case 'clouds':
        background += 'cloudy';
        break;
      case 'snow':
        background += 'snow';
        break;
      case 'rain':
      case 'drizzle':
        background += 'rain';
        break;
      case 'thunderstorm':
        background += 'lightning';
        break;
    }

    return background + '.jpg\')';
  }

  private generateDailyForecast(): void {
    this.weatherForecastDaily = [];
    let dailyForecast: DailyForecast = null;
    let weatherArray: string[] = [];
    let workingDate: Date = new Date();
    for (const item of this.weatherForecast3Hourly.list) {
      if (this.isSameDay(item.date)) {
        continue;
      }

      // new day
      if (workingDate.getDate() !== item.date.getDate()) {
        if (dailyForecast !== null) {
          dailyForecast.weather = this.getWeather(weatherArray);
          this.weatherForecastDaily.push(dailyForecast);
        }

        workingDate = item.date;
        weatherArray = [];
        dailyForecast = new DailyForecast();
        dailyForecast.date = item.date;
        dailyForecast.dateString = item.date.getDate() + '/' + (item.date.getMonth() + 1);
      }

      weatherArray.push(item.weather);
      if (dailyForecast.maxTemp < item.temp) {
        dailyForecast.maxTemp = item.temp;
      }

      if (dailyForecast.minTemp > item.temp) {
        dailyForecast.minTemp = item.temp;
      }
    }

    dailyForecast.weather = this.getWeather(weatherArray);
    this.weatherForecastDaily.push(dailyForecast);
  }

  private isSameDay(date: Date): boolean {
    return date.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
  }

  private getWeather(arr: string[]): string {
    return arr.sort((x, y) =>
      arr.filter(v => v === x).length
      - arr.filter(v => v === y).length
    ).pop();
  }
}
