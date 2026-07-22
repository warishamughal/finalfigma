import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline, chevronBackOutline, createOutline, ellipsisHorizontal } from 'ionicons/icons';
import { Global } from '../global';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DetailPage implements OnInit {
  product: any = null;
  contactInfo = {
    email: 'example@email.com',
    phone: '+92 300 0000000',
    address: 'Your Address Here'
  };

  orderSummary = {
    subtotal: 0,
    discount: 100,
    shipping: 200,
    total: 0
  };

  cartItems: any[] = [];

  constructor(
    private alertController: AlertController,
    private router: Router,
    private global: Global,
    private navCtrl: NavController
  ) {
    addIcons({ chevronBackOutline, ellipsisHorizontal, arrowBackOutline, createOutline });
  }

  ngOnInit() {
    this.product = this.global.getProduct(); // ✅ product from previous page
    if (this.product) {
      this.global.addToCart(this.product);
    }
    this.cartItems = this.global.getCartProducts();
    this.calculateOrderSummary();
  }

  calculateOrderSummary() {
    let subtotal = 0;
    this.cartItems.forEach(item => {
      subtotal += item.price * item.quantity;
    });
    this.orderSummary.subtotal = subtotal;
    this.orderSummary.total = subtotal - this.orderSummary.discount + this.orderSummary.shipping;
  }

  async updateEmail() {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      header: 'Update Email',
      inputs: [
        { 
          name: 'email', 
          type: 'email', 
          placeholder: 'example@email.com',
          value: this.contactInfo.email
        }
      ],
      buttons: [
        { 
          text: 'Cancel', 
          role: 'cancel',
          cssClass: 'alert-button-cancel'
        },
        {
          text: 'Save',
          cssClass: 'alert-button-confirm',
          handler: data => {
            if (data.email && data.email.trim() !== '') {
              this.contactInfo.email = data.email;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async updatePhone() {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      header: 'Update Phone',
      inputs: [
        { 
          name: 'phone', 
          type: 'tel', 
          placeholder: '+92 300 1234567',
          value: this.contactInfo.phone
        }
      ],
      buttons: [
        { 
          text: 'Cancel', 
          role: 'cancel',
          cssClass: 'alert-button-cancel'
        },
        {
          text: 'Save',
          cssClass: 'alert-button-confirm',
          handler: data => {
            if (data.phone && data.phone.trim() !== '') {
              this.contactInfo.phone = data.phone;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async updateAddress() {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      header: 'Update Address',
      inputs: [
        { 
          name: 'address', 
          type: 'text', 
          placeholder: 'Enter your address',
          value: this.contactInfo.address
        }
      ],
      buttons: [
        { 
          text: 'Cancel', 
          role: 'cancel',
          cssClass: 'alert-button-cancel'
        },
        {
          text: 'Save',
          cssClass: 'alert-button-confirm',
          handler: data => {
            if (data.address && data.address.trim() !== '') {
              this.contactInfo.address = data.address;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  placeOrder() {
    // Validate contact info before placing order
    if (this.contactInfo.email === 'example@email.com' || 
        this.contactInfo.phone === '+92 300 0000000' || 
        this.contactInfo.address === 'Your Address Here') {
      this.showValidationAlert();
      return;
    }

    this.global.setOrderData({
      contact: this.contactInfo,
      order: this.orderSummary,
      cartItems: this.cartItems
    });
    this.router.navigate(['/payment']);
  }

  async showValidationAlert() {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      header: 'Incomplete Information',
      message: 'Please update your contact information before placing an order.',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-confirm'
        }
      ]
    });
    await alert.present();
  }

  goBack() {
    this.navCtrl.back();
  }
}