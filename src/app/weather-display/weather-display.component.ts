import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { LocationService } from './location.service';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css']
})
export class WeatherDisplayComponent implements OnInit {
  weatherData: any;
  isLoading = true;
  error: string | null = null;

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.getLocationAndFetchWeather();
  }

  getLocationAndFetchWeather() {
    this.isLoading = true;
    this.locationService.getCurrentLocation()
      .then(location => {
        this.weatherService.getCurrentWeather(location.coords.latitude + ',' + location.coords.longitude)
          .subscribe(data => {
            this.weatherData = data;
            this.isLoading = false;
          }, error => {
            this.error = error.message;
            this.isLoading = false;
          });
      })
      .catch(error => {
        this.error = error.message;
        this.isLoading = false;
      });
  }
}