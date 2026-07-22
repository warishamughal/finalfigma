import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon,
  IonList, IonItem, IonLabel, IonAccordion, IonAccordionGroup
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  add, addOutline, airplaneOutline, arrowBackOutline, locationOutline,
  removeOutline, shareOutline, star, heart, heartOutline
} from 'ionicons/icons';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Global } from '../global';
import { Product } from '../interfaces'; 
import { ProductcomponentComponent } from '../productcomponent/productcomponent.component';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-productdetail',
  templateUrl: './productdetail.page.html',
  styleUrls: ['./productdetail.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon,
    IonList, IonItem, IonLabel, IonAccordion, IonAccordionGroup,
    CommonModule, FormsModule,ProductcomponentComponent
  ]
})
export class ProductdetailPage implements OnInit {
  product: Product | null = null; // ✅
  sizes: string[] = ['2kg', '3kg', '4kg', '5kg', '6kg', '8kg', '9kg', '10kg', '12kg'];
  selectedSize: string = '2kg';
  quantity: number = 1;

  cartCount = this.global.cartCount;
  favCount = this.global.favCount;

  constructor(
    private location: Location,
    public global: Global,
    private router: Router
  ) {
    addIcons({ 
      add, airplaneOutline, locationOutline, addOutline, heart, heartOutline,
      arrowBackOutline, shareOutline, removeOutline, star 
    });
  }

  ngOnInit() {
    this.product = this.global.getProduct();
  }

  goBack() { this.location.back(); }
  selectSize(size: string) { this.selectedSize = size; }

  increaseQty() { if (this.quantity < 10) this.quantity++; }
  decreaseQty() { if (this.quantity > 1) this.quantity--; }

  isFav(): boolean {
    return this.product ? this.global.isFavorite(this.product) : false;
  }

  toggleFav() {
    if (this.product) this.global.toggleFav(this.product);
  }

  addToCart() {
    if (this.product) {
      const item: Product = { ...this.product, size: this.selectedSize }; // ✅
      for (let i = 0; i < this.quantity; i++) {
        this.global.addToCart(item);
      }
      this.router.navigate(['/my-cart']);
    }
  }
}