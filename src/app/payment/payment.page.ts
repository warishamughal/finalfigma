import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline, chevronBackOutline, ellipsisHorizontal,
  walletOutline, cardOutline, bicycleOutline, airplaneOutline,
  chevronForwardOutline
} from 'ionicons/icons';
import { Global } from '../global';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PaymentPage {
  contactInfo = { email: '', phone: '', address: '' };
  orderSummary = { subtotal: 0, shipping: 0, total: 0 };
  cartItems: any[] = [];

  selectedPayment: string = '';
  selectedDelivery: string = '';
  private baseShipping: number = 0;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private navCtrl: NavController,
    private global: Global
  ) {
    addIcons({
      chevronBackOutline, ellipsisHorizontal, arrowBackOutline,
      walletOutline, cardOutline, bicycleOutline, airplaneOutline,
      chevronForwardOutline
    });
  }

  ngOnInit() {
    const data = this.global.getOrderData();
    if (data) {
      this.contactInfo = data.contact;
      this.orderSummary = data.order;
      this.cartItems = data.cartItems || [];
      this.baseShipping = this.orderSummary.shipping || 55;
      this.recalculateTotal();
    }
  }

  goBack() {
    this.navCtrl.back();
  }

  async selectPayment(method: string) {
    if (method === 'card') {
      const alert = await this.alertController.create({
        header: 'Card Payment Unavailable',
        message: 'Sorry, card payment is not available at the moment. Please select Cash on Delivery.',
        cssClass: 'custom-alert',
        buttons: [{ text: 'OK', cssClass: 'alert-button-confirm' }]
      });
      await alert.present();
      return;
    }
    this.selectedPayment = method;
  }

  async selectDelivery(type: string) {
    if (type === 'express') {
      if (this.selectedDelivery === 'express') return;

      const alert = await this.alertController.create({
        header: 'Express Delivery',
        message: 'Express delivery will add an extra $200 to your order. Do you want to continue?',
        cssClass: 'custom-alert',
        buttons: [
          { text: 'Cancel', role: 'cancel', cssClass: 'alert-button-cancel' },
          {
            text: 'Confirm',
            cssClass: 'alert-button-confirm',
            handler: () => {
              this.selectedDelivery = type;
              this.updateShipping();
            }
          }
        ]
      });
      await alert.present();
      return;
    }

    // Switching back to standard
    this.selectedDelivery = type;
    this.updateShipping();
  }

  updateShipping() {
    if (this.selectedDelivery === 'express') {
      this.orderSummary.shipping = this.baseShipping + 200;
    } else if (this.selectedDelivery === 'standard') {
      this.orderSummary.shipping = this.baseShipping;
    }
    this.recalculateTotal();
  }

  recalculateTotal() {
    this.orderSummary.total =
      Number(this.orderSummary.subtotal) + Number(this.orderSummary.shipping);
  }

 async placeOrder() {
  if (!this.selectedPayment) {
    const alert = await this.alertController.create({
      header: 'Payment Method Required',
      message: 'Please select a payment method before placing your order.',
      cssClass: 'custom-alert',
      buttons: ['OK']
    });
    await alert.present();
    return;
  }

  if (!this.selectedDelivery) {
    const alert = await this.alertController.create({
      header: 'Delivery Type Required',
      message: 'Please select a delivery type before placing your order.',
      cssClass: 'custom-alert',
      buttons: ['OK']
    });
    await alert.present();
    return;
  }

  // ✅ Save everything in Global before navigating
  const orderPlaced = {
    contact: this.contactInfo,
    order: this.orderSummary,
    cartItems: this.cartItems,
    payment: this.selectedPayment,
    delivery: this.selectedDelivery
  };

  this.global.setOrderData(orderPlaced);

  console.log('✅ Order data stored:', orderPlaced);

  // Go to OrderPlace page
  this.router.navigate(['/orderplace']);
}
}