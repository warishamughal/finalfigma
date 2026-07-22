import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class Alert {
  constructor(private alertCtrl: AlertController) {}

  // ✅ Generic Alert
  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // ✅ Wrong Password Alert
  async presentWrongPasswordAlert() {
    const alert = await this.alertCtrl.create({
      header: '❌ Wrong Password',
      message: 'The password you entered is incorrect.',
      buttons: ['OK']
    });
    await alert.present();
  }

  // ✅ Wrong Username Alert
  async presentWrongUsernameAlert() {
    const alert = await this.alertCtrl.create({
      header: '❌ Wrong Username',
      message: 'This username does not exist.',
      buttons: ['OK']
    });
    await alert.present();
  }

  // ✅ Invalid Password Alert
  async presentInvalidPasswordAlert() {
    const alert = await this.alertCtrl.create({
      header: '⚠️ Invalid Password',
      message: 'Password does not meet all conditions.',
      buttons: ['OK']
    });
    await alert.present();
  }

  // ✅ Success Alert
  async presentSuccessAlert(message: string = "✅ Operation Successful!") {
    const alert = await this.alertCtrl.create({
      header: 'Success',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // ✅ Blocked Alert
  async presentBlockedAlert() {
    const alert = await this.alertCtrl.create({
      header: '🚫 Blocked',
      message: 'Too many wrong attempts. Login permanently disabled!',
      buttons: ['OK']
    });
    await alert.present();
  }

  // ✅ Fail Order Alert
  async presentFailAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'fail-popup',
      backdropDismiss: false,
      header: 'Oops! Order Failed',
      subHeader: 'Something went terribly wrong.',
      buttons: [
        { text: 'Please Try Again', role: 'try', cssClass: 'try' },
        { text: 'Back to home', role: 'cancel', cssClass: 'bak' }
      ]
    });
    await alert.present();
  }

  // ✅ Quantity Alert (MyCart ke liye)
  async presentQuantityAlert(product: any, products: any[], index: number, calculateFn: Function) {
    const alert = await this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Do you want to add a new card or continue increasing quantity?',
      cssClass: 'custom-alert',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            products.push({ ...product, quantity: 0, subtotal: product.price * 1 });
            calculateFn();
          }
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            products[index].quantity++;
            calculateFn();
          }
        }
      ]
    });
    await alert.present();
  }
}
