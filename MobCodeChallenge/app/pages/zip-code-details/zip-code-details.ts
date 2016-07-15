import {Component} from '@angular/core';
import {Loading, NavController, NavParams} from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'build/pages/zip-code-details/zip-code-details.html'
})
export class ZipCodeDetailsPage {
  zipcode: string;
  openweathermap_api_key: string;
  zipcodeWeather: Object;
  currentUnit: string;

  constructor(private nav: NavController, navParams: NavParams, private http:Http) {
    this.zipcode = navParams.get('zipcode');
    this.openweathermap_api_key = "9be27abdd75e963ba6b8dcf610966fb9";
    this.getWeatherForZipcode(this.zipcode);
    this.currentUnit = "F";
  }
  getWeatherForZipcode(zipcode) {
      let loading = Loading.create();
      this.nav.present(loading);
      let url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=" + this.openweathermap_api_key;
      this.http.get(url)
      .map(res => res.json())
      .subscribe(
          data => {
              this.zipcodeWeather = data;
              console.log(data);
          },
          err => {
              console.error(err);
          },
          () => {
              console.log("finally?");
              loading.dismiss();
          }
      );
  }
  getTemperature(temp) {
      if (this.currentUnit === "F") {
          return ((parseFloat(temp) * 9/5) - 459.67).toFixed(2);
      } else {
          return (parseFloat(temp) - 273.15).toFixed(2);
      }
  }
}
