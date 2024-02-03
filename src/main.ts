import { bootstrapApplication } from '@angular/platform-browser';
import { WeatherDisplayComponent } from './src/app/weather-display/weather-display.component'; // Adjust the path if needed
import { WeatherService } from './src/app/weather.service';
import { LocationService } from './src/app/location.service';

bootstrapApplication(WeatherDisplayComponent, [WeatherService, LocationService]);