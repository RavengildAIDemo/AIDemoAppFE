import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have the 'AIDemoAppFE' title`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('AIDemoAppFE');
  // });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, AIDemoAppFE');
  });
});
describe('AppComponent', () => {

  it('should call getWeatherData with correct params on init', () => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', ['getWeatherData']);
    const component = new AppComponent(weatherServiceSpy);
    const mockPosition = {
      coords: {
        latitude: 1,
        longitude: 2,
        accuracy: 0,
        altitude: 0,
        altitudeAccuracy: 0,
        heading: 0,
        speed: 0
      },
      timestamp: 1234567890
    };
    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((success) => {
      success(mockPosition);
    });

    component.ngOnInit();

    expect(weatherServiceSpy.getWeatherData).toHaveBeenCalledWith(mockPosition.coords.latitude, mockPosition.coords.longitude);
  });

  it('should handle getWeatherData promise resolve', async () => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', ['getWeatherData']);
    const mockWeatherData = { name: 'London', main: { temp: 20 }, weather: [{ description: 'Sunny' }] };
    weatherServiceSpy.getWeatherData.and.returnValue(Promise.resolve(mockWeatherData));
    const component = new AppComponent(weatherServiceSpy);

    await component.ngOnInit();

    const locationElement = document.getElementById('location');
    if (locationElement) {
      expect(locationElement.innerText).toBe('Weather in London');
    }
    const temperatureElement = document.getElementById('temperature');
    expect(temperatureElement?.innerText).toBe('Temperature: 20°K');
    const descriptionElement = document.getElementById('description');
    expect(descriptionElement?.innerText).toBe('Weather: Sunny');
  });

  it('should handle getWeatherData promise rejection', async () => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', ['getWeatherData']);
    weatherServiceSpy.getWeatherData.and.returnValue(Promise.reject('Error'));
    const component = new AppComponent(weatherServiceSpy);

    await component.ngOnInit();

    expect(console.error).toHaveBeenCalledWith('Error:', 'Error');
  });

});


