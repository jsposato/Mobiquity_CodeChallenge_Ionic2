import {Component} from '@angular/core';
import {Alert, NavController} from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/zip-codes/zip-codes.html'
})
export class ZipCodesPage {
  nav: NavController;
  zipcodes: string[];

  static get parameters() {
    return [[NavController]];
  }
  constructor(nav) {
      this.nav = nav;
      this.zipcodes = [];
  }
  addZipCode() {
      let alert = Alert.create({
          title: 'Enter Zip Code',
          message: '',
          inputs: [
              { name: 'zipcode', placeholder: 'Zip Code' }
          ],
          buttons: [
              {
                  text: 'OK',
                  handler: data => {
                      alert.dismiss().then(() => {
                          this.validateZipCode(data.zipcode);
                      });
                  }
              }
          ]
      });
      this.nav.present(alert);
  }
  validateZipCode(zipcode) {
      let isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipcode);
      if (isValidZip) {
          this.zipcodes.push(zipcode);
      } else {
          let alert = Alert.create({
              title: 'Invalid Zip Code',
              message: 'Zip Codes must be 5 digits only',
              buttons: [{
                  text: 'OK',
                  handler: () => {
                      alert.dismiss();
                  }
              }]
          });
          this.nav.present(alert);
      }
  }
  zipcodeSelected(zipcode) {
      console.log(zipcode);
  }
}
