import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
  private apiKey = 'e423221a1039601afac724ae8b6dc244'; // replace with your OpenWeatherMap API key

  async getWeatherData(lat: number, lon: number) {
    const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    const response = await fetch(url);
    return response.json();
  }
}