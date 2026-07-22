import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonModal,
  IonFooter, IonButton, IonIcon, IonBadge
} from '@ionic/angular/standalone';
import { FooterComponent } from '../footer/footer.component';

// imports array mein add karein:

import { addIcons } from 'ionicons';
import {
  add, addOutline, airplaneOutline, arrowBackOutline, bagHandleOutline,
  bicycleOutline, cardOutline, cartOutline, chevronBackOutline,
  chevronForwardOutline, closeOutline, compassOutline, heartOutline,
  locationOutline, person, removeOutline, shareOutline, star,
  walletOutline, checkmarkCircleOutline, shieldCheckmarkOutline, closeCircleOutline,
} from 'ionicons/icons';
import { Router } from '@angular/router';
import { Alert } from '../alert';
import { Global } from '../global';
import { NavController } from '@ionic/angular';
import { Product } from '../interfaces'; 

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.page.html',
  styleUrls: ['./my-cart.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonModal,
    IonFooter, IonButton, IonIcon, IonBadge, CommonModule, FormsModule, FooterComponent
  ],
})
export class MyCartPage implements OnInit {

  cartProducts = this.global.cartProducts;
  favProducts = this.global.favProducts;
  cartCount = this.global.cartCount;
  favCount = this.global.favCount;

  discount: number = 110;
  shipping: number = 200;
  activePage: string = 'cart';
  currentActiveIndex: number = 1;
  navItems = ['shop', 'cart', 'explore', 'favorites', 'profile'];

  constructor(
    private router: Router,
    private alert: Alert,
    public global: Global,
    private navCtrl: NavController
  ) {
    addIcons({
      add, addOutline, airplaneOutline, arrowBackOutline, heartOutline, locationOutline,
      person, removeOutline, shareOutline, star, compassOutline, bagHandleOutline,
      cartOutline, chevronBackOutline, closeOutline, cardOutline, chevronForwardOutline,
      bicycleOutline, walletOutline, checkmarkCircleOutline, shieldCheckmarkOutline, closeCircleOutline
    });
  }

  ngOnInit() {}
  ionViewWillEnter() {}

  openProduct(item: Product) { 
    this.global.setProduct(item);
    this.router.navigate(['/productdetail']);
  }

  toggleFav(item: Product) { 
    this.global.toggleFav(item);
  }

  async showQuantityAlert(i: number) {
    const products = this.cartProducts();
    await this.alert.presentQuantityAlert(
      products[i], products, i, this.calculate.bind(this)
    );
  }

  goto(i: number, action: 'inc' | 'dec') {
    const products = this.cartProducts();
    const item = products[i];
    if (action === 'inc') {
      if ((item.quantity || 0) < 5) {
        this.global.updateCartQuantity(item.name, (item.quantity || 0) + 1);
      } else {
        this.showQuantityAlert(i);
      }
    } else {
      if ((item.quantity || 0) > 1) {
        this.global.updateCartQuantity(item.name, (item.quantity || 0) - 1);
      } else {
        this.global.removeFromCart(item);
      }
    }
  }

  removeItem(i: number) {
    const products = this.cartProducts();
    this.global.removeFromCart(products[i]);
  }

  calculate() {
    const products = this.cartProducts();
    let subtotal = 0;
    for (let item of products) {
      subtotal += (item.price || 0) * (item.quantity || 0);
    }
    if (subtotal === 0) return { subtotal: 0, discount: 0, shipping: 0, grandTotal: 0 };
    return { subtotal, discount: this.discount, shipping: this.shipping, grandTotal: subtotal - this.discount + this.shipping };
  }

  async placeOrder(modal: IonModal) {
    modal.dismiss(null, 'cancel');
    this.router.navigate(['/detail']);
  }

  setActive(page: string) {
    const clickedIndex = this.navItems.indexOf(page);
    const clickedItem = document.querySelector(`.nav-item.${page}`);
    const isMovingRight = clickedIndex > this.currentActiveIndex;
    const isMovingLeft = clickedIndex < this.currentActiveIndex;
    if (isMovingRight && clickedItem) {
      clickedItem.classList.add('moving-right');
      setTimeout(() => clickedItem.classList.remove('moving-right'), 600);
    }
    if (isMovingLeft && clickedItem) {
      clickedItem.classList.add('moving-left');
      setTimeout(() => clickedItem.classList.remove('moving-left'), 600);
    }
    if (clickedItem) {
      clickedItem.classList.add('wave-effect');
      setTimeout(() => clickedItem.classList.remove('wave-effect'), 600);
    }
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    if (clickedItem) clickedItem.classList.add('active');
    this.currentActiveIndex = clickedIndex;
    this.activePage = page;
  }

  goBack() { this.navCtrl.back(); }
  cart() { this.router.navigate(['./my-cart']); }
  go() { this.router.navigate(['./homescr']); }
  expo() { this.router.navigate(['./explore']); }
  fvrt() { this.router.navigate(['./fav']); }
  pro() { this.router.navigate(['./account']); }
}