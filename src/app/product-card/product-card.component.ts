import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, heartOutline, addOutline } from 'ionicons/icons';
import { Product } from '../interfaces';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonButton, IonIcon]
})
export class ProductCardComponent {

  // ✅ Parent se data aayega
  @Input() item!: Product;

  // ✅ Parent ko events bhejenge
  @Output() productClick = new EventEmitter<Product>();
  @Output() favToggle = new EventEmitter<Product>();
  @Output() addCart = new EventEmitter<Product>();

  constructor() {
    addIcons({ heart, heartOutline, addOutline });
  }

  onProductClick() {
    this.productClick.emit(this.item);
  }

  onFavToggle(event: Event) {
    event.stopPropagation();
    this.favToggle.emit(this.item);
  }

  onAddToCart(event: Event) {
    event.stopPropagation();
    this.addCart.emit(this.item);
  }
}