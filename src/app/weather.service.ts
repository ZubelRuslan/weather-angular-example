import { Injectable } from '@angular/core';
import {City} from './interfaces/city.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Weather} from './interfaces/weather.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient ) { }

  private cityUrl = 'https://gist.githubusercontent.com/alex-oleshkevich/6946d85bf075a6049027306538629794/raw/3986e8e1ade2d4e1186f8fee719960de32ac6955/by-cities.json';

  getCities(): Observable<any[]> {
    return this.http.get(this.cityUrl)
        .pipe(
          map((data: any) => {
            const cities = [];
            data[0].regions.forEach((el: any) => {
              el.cities.forEach((cityItem: City) => {
                cities.push(cityItem);
              });
            });
            return cities;
          })
        );
    }

  getWeather(lat: number, lng: number): Observable<Weather> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=70d890e3f5d9af3e9b703b6ccb3f8267&lang=ru&units=metric`)
      .pipe(
        map((data: any) => {
          const weather = [];
          const days = [];
          data.daily.forEach((elem: any) => {
            weather.push({day: Math.round(elem.temp.day), night: Math.round(elem.temp.night)});
            days.push(`${new Date(elem.dt * 1000).getDate()}/${new Date(elem.dt * 1000).getMonth() + 1}`);
          });
          return {weather, days};
        })
      );
  }
}

