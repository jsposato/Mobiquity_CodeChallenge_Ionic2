import {Component} from '@angular/core';
import {Loading, NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http';
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
              data.weather.map(item => {
                  item.iconUrl = "http://openweathermap.org/img/w/" + item.icon + ".png";
                  return item;
              });
              this.zipcodeWeather = data;
              console.log(data);
          },
          err => {
              console.error(err);
          },
          () => {
              console.log("finally");
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
  getDirection(deg) {
      let dir = "";
      if (deg >= 0 && deg <= 11.25) {
          dir = "N";
      }
      if (deg > 348.75 && deg <= 360) {
          dir = "N";
      }
      if (deg > 11.25 && deg <= 33.75) {
          dir = "NNE";
      }
      if (deg > 33.75 && deg <= 56.25) {
          dir = "NE";
      }
      if (deg > 56.25 && deg <= 78.75) {
          dir = "ENE";
      }
      if (deg > 78.75 && deg <= 101.25) {
          dir = "E";
      }
      if (deg > 101.25 && deg <= 123.75) {
          dir = "ESE";
      }
      if (deg > 123.75 && deg <= 146.25){
          dir = "SE";
      }
      if (deg > 146.25 && deg <= 168.75){
          dir = "SSE";
      }
      if (deg > 168.75 && deg <= 191.25){
          dir = "S";
      }
      if (deg > 191.25 && deg <= 213.75){
          dir = "SSW";
      }
      if (deg > 213.75 && deg <= 236.25){
          dir = "SW";
      }
      if (deg > 236.25 && deg <= 258.75){
          dir = "WSW";
      }
      if (deg > 258.75 && deg <= 281.25){
          dir = "W";
      }
      if (deg > 281.25 && deg <= 303.75){
          dir = "WNW";
      }
      if (deg > 303.75 && deg <= 326.25){
          dir = "NW";
      }
      if (deg > 326.25 && deg <= 348.75){
          dir = "NNW";
      }
      return dir;
  }
}
