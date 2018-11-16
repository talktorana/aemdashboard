import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {City} from '../models/city';
import {WeatherResponse} from '../models/weather.response';
import {WeatherItem} from '../models/weather.item';

@Injectable()
export class WeatherService {

  private readonly BASE_URL = environment.weather.baseUrl;

  constructor(private http: HttpClient) {

  }

  public getForecast(lat: number, lon: number, unit: string): Observable<WeatherResponse> {
    return this.http.get(this.BASE_URL + `/forecast?lat=${lat}&lon=${lon}&units=${unit}`)
      .pipe(
        map((res: any) => {
          const weatherResponse: WeatherResponse = new WeatherResponse();
          weatherResponse.city = this.mapCity(res.city);
          for (const item of res.list) {
            weatherResponse.list.push(this.mapListItem(item));
          }

          return weatherResponse;
        })
      );
  }

  private mapCity(apiCity: any): City {
    const city: City = new City();
    city.name = apiCity.name;

    return city;
  }

  private mapListItem(listItem: any): WeatherItem {
    const item: WeatherItem = new WeatherItem();
    item.weather = listItem.weather[0].main.toLowerCase();
    item.description = listItem.weather[0].description;
    item.date = new Date(listItem.dt_txt);
    item.temp = Math.round(listItem.main.temp);

    return item;
  }
}
