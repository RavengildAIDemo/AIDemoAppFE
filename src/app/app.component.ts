import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule], // Include CommonModule here
  // providers: [WeatherService] is not needed if the service is providedIn: 'root'
})
export class AppComponent implements OnInit {
  weather: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.weatherService.getWeather(position.coords.latitude, position.coords.longitude)
        .subscribe(data => {
          this.weather = data;
        }, error => console.error(error));
    }, error => console.error(error));
  }
}
