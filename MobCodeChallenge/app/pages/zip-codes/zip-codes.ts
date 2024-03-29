import {Component} from '@angular/core';
import {Alert, NavController} from 'ionic-angular';
import {ZipCodeDetailsPage} from '../zip-code-details/zip-code-details';


@Component({
  templateUrl: 'build/pages/zip-codes/zip-codes.html'
})
export class ZipCodesPage {
  zipcodes: string[];

  static get parameters() {
    return [[NavController]];
  }
  constructor(private nav:NavController) {
      this.zipcodes = ["32601"];
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
          if (this.zipcodes.indexOf(zipcode) !== -1) {
              this.showGenericMessage('Zip Code already added');
          } else {
              this.zipcodes.push(zipcode);
          }
      } else {
          this.showGenericMessage('Invalid Zip Code. Zip Codes must be 5 digits only');
      }
  }
  showGenericMessage(msg) {
      let alert = Alert.create({
          title: 'Error',
          message: msg,
          buttons: [{
              text: 'OK',
              handler: () => {
                  alert.dismiss();
              }
          }]
      });
      this.nav.present(alert);
  }
  zipcodeSelected(zipcode) {
      this.nav.push(ZipCodeDetailsPage, {
          zipcode : zipcode
      });
  }
}
