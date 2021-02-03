import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {City} from '../interfaces/city.interface';
import {WeatherService} from '../weather.service';
import {Weather} from '../interfaces/weather.interface';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  constructor(private weatherService: WeatherService) { }

  cities: City[] = [];
  cities$: Observable<City[]>;
  weatherData$: Observable<Weather>;
  selectedCity: City;

  ngOnInit(): void {
    this.getCities();
    this.cities$ = this.weatherService.getCities();
  }

  getCities(): void {
    this.weatherService.getCities()
      .subscribe(cities => {
        this.cities = cities;
      });
  }

  findCity(name): City {
    return this.cities.find(elem => elem.name === name);
  }

  getWeather(): void {
    const cityData: City = this.findCity(this.selectedCity);
    this.weatherData$ = this.weatherService.getWeather(cityData.lat, cityData.lng);
  }
}
