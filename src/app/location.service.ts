import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  getCurrentLocation(): Promise<GeolocationCoordinates> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        const geolocationCallback = (position: GeolocationPosition) => {
          resolve(position.coords);
        };
        navigator.geolocation.getCurrentPosition(geolocationCallback, reject);
      } else {
        reject(new Error('Geolocation not supported'));
      }
    });
  }
}