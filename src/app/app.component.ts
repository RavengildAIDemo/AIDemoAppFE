import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class AppComponent {
  weatherData: any;

  constructor(private weatherService: WeatherService) {}

  /**
 * Fetches the user's current location via the Geolocation API, 
 * calls the weather service to get weather data for that location, 
 * and updates the DOM elements with the location name, temperature, 
 * and weather description from the weather data.
 * Handles promise resolution and rejection.
 */
  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.weatherService.getWeatherData(position.coords.latitude, position.coords.longitude)
        .then((data: any) => {
          console.log(data);
          this.weatherData = data;
          const locationElement = document.getElementById('location');
          const temperatureElement = document.getElementById('temperature');
          const descriptionElement = document.getElementById('description');
          if (locationElement && temperatureElement && descriptionElement) {
            locationElement.innerText = `Weather in {{weatherData.name}}`;
            temperatureElement.innerText = `Temperature: {{weatherData.main.temp}}°K`;
            descriptionElement.innerText = `Weather: {{weatherData.weather[0].description}}`;
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          // Change contents of page to say "error" instead of weather data
          const locationElement = document.getElementById('location');
          const temperatureElement = document.getElementById('temperature');
          const descriptionElement = document.getElementById('description');
          if (locationElement && temperatureElement && descriptionElement) {
            locationElement.innerText = 'Weather not found';
            temperatureElement.innerText = 'Temperature: error';
            descriptionElement.innerText = 'Weather: error';
          }
        });
    });
  }

}
