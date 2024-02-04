import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  template: `
    <div id="weatherData">
      <h2 id="location"></h2>
      <p id="temperature"></p>
      <p id="description"></p>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
  standalone: true,
})
export class AppComponent {
  weatherData: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.weatherService.getWeatherData(position.coords.latitude, position.coords.longitude)
          .then((data) => {
            this.weatherData = data;
            const locationElement = document.getElementById('location');
            const temperatureElement = document.getElementById('temperature');
            const descriptionElement = document.getElementById('description');
            if (locationElement && temperatureElement && descriptionElement) {
              locationElement.innerText = `${this.weatherData.name}`;
              temperatureElement.innerText = `${this.weatherData.main.temp} K`;
              descriptionElement.innerText = `${this.weatherData.weather[0].description}`;
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            const locationElement = document.getElementById('location');
            const temperatureElement = document.getElementById('temperature');
            const descriptionElement = document.getElementById('description');
            if (locationElement && temperatureElement && descriptionElement) {
              locationElement.innerText = 'ERROR';
              temperatureElement.innerText = 'ERROR';
              descriptionElement.innerText = 'ERROR';
            }
          });
      },
      (error) => {
        // This function will run if there was an error
        switch(error.code) {
          case error.PERMISSION_DENIED:
            console.error("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            break;
          default:
            console.error("An unknown error occurred.");
            break;
        }
      }
    );
  }
}
