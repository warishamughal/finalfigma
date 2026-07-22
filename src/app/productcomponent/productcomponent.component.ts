import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonButton, IonIcon,
  IonList, IonItem, IonLabel, IonAccordion, IonAccordionGroup,
  IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  add, addOutline, arrowBackOutline,
  removeOutline, shareOutline, star, heart, heartOutline
} from 'ionicons/icons';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Global } from '../global';
import { Product } from '../interfaces';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-productcomponent',
  templateUrl: './productcomponent.component.html',
  styleUrls: ['./productcomponent.component.scss'],
  standalone: true,
  imports: [
    IonContent, IonButton, IonIcon,
    IonList, IonItem, IonLabel, IonAccordion, IonAccordionGroup,
    IonGrid, IonRow, IonCol,
    CommonModule, FormsModule
  ]
})
export class ProductcomponentComponent implements OnInit {

  product: Product | null = null;
  sizes: string[] = ['2kg', '3kg', '4kg', '5kg', '6kg', '8kg', '9kg', '10kg', '12kg'];
  selectedSize: string = '2kg';
  quantity: number = 1;

  cartCount = this.global.cartCount;

  constructor(
    private location: Location,
    public global: Global,
    private router: Router
  ) {
    addIcons({
      add, addOutline, heart, heartOutline,
      arrowBackOutline, shareOutline, removeOutline, star
    });
  }

  ngOnInit() {
    // Global service se product lo (jo bhi page ne set kiya ho)
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
      const item: Product = { ...this.product, size: this.selectedSize };
      for (let i = 0; i < this.quantity; i++) {
        this.global.addToCart(item);
      }
      this.router.navigate(['/my-cart']);
    }
  }
}