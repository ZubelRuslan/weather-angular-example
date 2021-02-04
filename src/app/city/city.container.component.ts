import {Component} from '@angular/core';
import {Observable} from 'rxjs';

import {City} from '../interfaces/city.interface';
import {WeatherService} from '../weather.service';
import {Weather} from '../interfaces/weather.interface';

@Component({
  selector: 'app-city-container',
  template: `<app-city
    [cities]="cities$ | async"
    [weatherData]="weather$ | async"
    (cityChanged)="onCityChanged($event)"
  ></app-city>`,
})
export class CityContainerComponent {

  constructor(private weatherService: WeatherService) {
  }

  weather$: Observable<Weather>;

  cities$: Observable<City[]> = this.weatherService.getCities();

  onCityChanged(city: City): void {
    this.weather$ = this.weatherService.getWeather(city.lat, city.lng);
  }

}
