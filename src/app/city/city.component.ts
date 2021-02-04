import {Component, EventEmitter, Input, Output} from '@angular/core';

import {City} from '../interfaces/city.interface';
import {Weather} from '../interfaces/weather.interface';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent {

  @Input()
  weatherData: Weather;
  @Input()
  cities: City[];

  @Output()
  cityChanged: EventEmitter<City> = new EventEmitter<City>();

  selectedCity: string;

  private findCity(name: string): City {
    return this.cities.find(elem => elem.name === name);
  }

  getWeather(): void {
    this.cityChanged.emit(this.findCity(this.selectedCity));
  }

}
