import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/zip-code-details/zip-code-details.html'
})
export class ZipCodeDetailsPage {
  zipcode: any;
  openweathermap_api_key: "9be27abdd75e963ba6b8dcf610966fb9";

  constructor(private nav: NavController, navParams: NavParams) {
    this.zipcode = navParams.get('zipcode');
  }
}
