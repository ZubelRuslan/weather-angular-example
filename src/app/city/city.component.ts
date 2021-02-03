import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';

import {City} from '../interfaces/city.interface';
import {WeatherService} from '../weather.service';
import {Weather} from '../interfaces/weather.interface';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit, OnDestroy {
  constructor(private weatherService: WeatherService) { }

  cities: City[];
  cities$: Subscription;
  weatherData$: Observable<Observable<Weather>>;
  selectedCity: City;
  city$: Subject<any> = new BehaviorSubject('');

  ngOnInit(): void {
    this.cities$ = this.getCities().subscribe(cities => {
      this.cities = cities;
    });

    this.weatherData$ = this.city$.pipe(
      map((cityData: any) => {
        if (cityData) {
          return this.weatherService.getWeather(cityData.lat, cityData.lng);
        }
      })
    );
  }

  getCities(): Observable<City[]> {
    return this.weatherService.getCities();
  }

  findCity(name): City {
    return this.cities.find(elem => elem.name === name);
  }

  getWeather(): void {
    const cityData: City = this.findCity(this.selectedCity);
    this.city$.next(cityData);
  }

  ngOnDestroy(): void {
      this.cities$.unsubscribe();
  }
}
