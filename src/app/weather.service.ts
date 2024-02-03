import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey = 'e423221a1039601afac724ae8b6dc244'; // Use your OpenWeatherMap API Key
  apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeather(lat: number, lon: number) {
    return this.http.get(`${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`);
  }
}