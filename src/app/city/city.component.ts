import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Observable, Subject} from 'rxjs';

import {City} from '../interfaces/city.interface';
import {WeatherService} from '../weather.service';
import {Weather} from '../interfaces/weather.interface';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  constructor(private weatherService: WeatherService) {
  }

  weather$: Observable<Weather>;

  selectedCity: string;

  selectedCity$: Subject<string> = new Subject<string>();

  cities$: Observable<City[]> = this.weatherService.getCities();

  ngOnInit(): void {

    this.weather$ = combineLatest([this.cities$, this.selectedCity$]).pipe(
      switchMap(([cities, selectedCity]: [City[], string]): Observable<Weather> => {
        const city = this.findCity(selectedCity, cities);
        return this.weatherService.getWeather(city.lat, city.lng);
      })
    );
  }

  private findCity(name: string, cities: City[]): City {
    return cities.find(elem => elem.name === name);
  }

  getWeather(): void {
    this.selectedCity$.next(this.selectedCity);
  }

}
