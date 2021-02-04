import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {CityComponent} from './city/city.component';
import {FormsModule} from '@angular/forms';
import {CityContainerComponent} from './city/city.container.component';
import {WeatherService} from './weather.service';

@NgModule({
  declarations: [
    AppComponent,
    CityComponent,
    CityContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
