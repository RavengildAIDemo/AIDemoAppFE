import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
  private apiKey = 'e423221a1039601afac724ae8b6dc244aa'; // replace with your OpenWeatherMap API key

  async getWeatherData(lat: number, lon: number) {
    try {
      const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      // Handle the error gracefully
      console.error('Error fetching weather data:', error);
      return null; // Or any other appropriate action
    }
  }
}

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(response => {
        console.log('Response:', response);
      })
    );
  }
}