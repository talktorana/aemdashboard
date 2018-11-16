import {City} from './city';
import {WeatherItem} from './weather.item';

export class WeatherResponse {
  public city: City;
  public list: WeatherItem[] = [];
}
