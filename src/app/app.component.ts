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
    navigator.geolocation.getCurrentPosition((position) => {
      this.weatherService.getWeatherData(position.coords.latitude, position.coords.longitude)
  .then((data: any) => {
    console.log(data);
    this.weatherData = data;
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    if (locationElement && temperatureElement && descriptionElement) {
      locationElement.innerText = `Weather in ${this.weatherData.name}`;
      temperatureElement.innerText = `Temperature: ${this.weatherData.main.temp}°K`;
      descriptionElement.innerText = `Weather: ${this.weatherData.weather[0].description}`;
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
    });
  }
}
