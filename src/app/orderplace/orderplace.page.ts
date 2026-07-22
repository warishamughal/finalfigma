import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardContent,
  NavController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, trashOutline } from 'ionicons/icons';
import { Global } from '../global';

@Component({
  selector: 'app-orderplace',
  templateUrl: './orderplace.page.html',
  styleUrls: ['./orderplace.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardContent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrderplacePage {
  activeTab: string = 'pending';
  pendingOrders: any[] = [];
  deliveredOrders: any[] = [];
  cancelledOrders: any[] = [];

  contactInfo: any = null;
  payment: string = '';
  delivery: string = '';

  constructor(private navCtrl: NavController, private global: Global) {
    addIcons({ arrowBackOutline, trashOutline });
  }

  ngOnInit() {
    this.loadOrdersFromStorage();
  }

  goBack() {
    this.navCtrl.navigateRoot('/homescr');
  }

  changeTab(tab: string) {
    this.activeTab = tab;
  }

  loadOrdersFromStorage() {
    const savedPending = localStorage.getItem('pendingOrders');
    const savedDelivered = localStorage.getItem('deliveredOrders');
    const savedCancelled = localStorage.getItem('cancelledOrders');
    const savedContact = localStorage.getItem('contactInfo');
    const savedPayment = localStorage.getItem('payment');
    const savedDelivery = localStorage.getItem('delivery');

    if (savedDelivered) this.deliveredOrders = JSON.parse(savedDelivered);
    if (savedCancelled) this.cancelledOrders = JSON.parse(savedCancelled);
    if (savedPending) this.pendingOrders = JSON.parse(savedPending);

    const orderData = this.global.getOrderData();
    if (orderData && orderData.cartItems && orderData.cartItems.length > 0) {
      orderData.cartItems.forEach((newItem: any) => {
        const exists = this.pendingOrders.some(
          (existingItem) =>
            existingItem.name === newItem.name &&
            existingItem.color === newItem.color &&
            existingItem.size === newItem.size
        );
        if (!exists) this.pendingOrders.push(newItem);
      });

      this.contactInfo = orderData.contact;
      this.payment = orderData.payment;
      this.delivery = orderData.delivery;

      this.saveToStorage();
      this.global.clearOrderData();
    } else {
      if (savedContact) this.contactInfo = JSON.parse(savedContact);
      if (savedPayment) this.payment = savedPayment;
      if (savedDelivery) this.delivery = savedDelivery;
    }
  }

  saveToStorage() {
    localStorage.setItem('pendingOrders', JSON.stringify(this.pendingOrders));
    localStorage.setItem('deliveredOrders', JSON.stringify(this.deliveredOrders));
    localStorage.setItem('cancelledOrders', JSON.stringify(this.cancelledOrders));
    localStorage.setItem('contactInfo', JSON.stringify(this.contactInfo));
    localStorage.setItem('payment', this.payment);
    localStorage.setItem('delivery', this.delivery);
  }

  deliverOrder(item: any) {
    this.deliveredOrders.push(item);
    this.pendingOrders = this.pendingOrders.filter((i) => i !== item);
    this.activeTab = 'delivered';
    this.saveToStorage();
  }

  cancelOrder(item: any) {
    this.cancelledOrders.push(item);
    this.pendingOrders = this.pendingOrders.filter((i) => i !== item);
    this.activeTab = 'cancelled';
    this.saveToStorage();
  }

  deleteDelivered(item: any) {
    this.deliveredOrders = this.deliveredOrders.filter((i) => i !== item);
    this.saveToStorage();
  }

  deleteCancelled(item: any) {
    this.cancelledOrders = this.cancelledOrders.filter((i) => i !== item);
    this.saveToStorage();
  }
}
