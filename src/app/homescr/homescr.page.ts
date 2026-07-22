import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonButton, 
  IonIcon, IonItem, IonLabel, IonList, IonAccordion, IonAccordionGroup, 
  IonBadge, IonSearchbar, IonGrid, IonRow, IonCol 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  add, addOutline, airplaneOutline, arrowBackOutline, bagHandleOutline, 
  cartOutline, compassOutline, heart, heartOutline, locationOutline, 
  person, removeOutline, shareOutline, star 
} from 'ionicons/icons';
import { Router } from '@angular/router';
import { Data } from '../data';
import { Global } from '../global';
import { SearchPipe } from '../search-pipe';
import { Product } from '../interfaces';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-homescr',
  templateUrl: './homescr.page.html',
  styleUrls: ['./homescr.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonButton, 
    IonIcon, IonItem, IonLabel, IonList, IonAccordion, IonAccordionGroup, 
    IonBadge, IonSearchbar, IonGrid, IonRow, IonCol,
    CommonModule, FormsModule, SearchPipe, ProductCardComponent
  ]
})
export class HomescrPage implements OnInit {

  // Products arrays
  product: Product[] = [];
  product1: Product[] = [];
  product2: Product[] = [];
  product3: Product[] = [];
  product4: Product[] = [];

  searchTerm: string = '';
  activePage: string = 'shop';
  currentActiveIndex: number = 0;
  navItems = ['shop', 'cart', 'explore', 'favorites', 'profile'];

  // Animations
  handActive = false;
  linesActive = false;
  pageActive = false;

  constructor(
    private router: Router,
    private data: Data,
    public global: Global
  ) {
    addIcons({
      add, addOutline, airplaneOutline, arrowBackOutline, heart,
      heartOutline, locationOutline, person, removeOutline,
      shareOutline, star, compassOutline, bagHandleOutline, cartOutline
    });
  }

  ngOnInit() {
    // Load products
    this.product = this.data.getHomeProducts();
    this.product1 = this.product.slice(0, 8);
    this.product2 = this.product.slice(8, 16);
    this.product3 = this.product.slice(16, 20);
    this.product4 = this.product.slice(20, 26);

    // Trigger initial animation
    this.triggerInitialAnimation();

    // Activate default nav item
    setTimeout(() => {
      const shopItem = document.querySelector('.nav-item.shop');
      if (shopItem) shopItem.classList.add('active');
    }, 100);
  }

  // Methods
  openProduct(item: Product) {
    this.global.setProduct(item);
    this.router.navigate(['/productdetail']);
  }

  toggleFav(item: Product) {
    this.global.toggleFav(item);
  }

  favCount() { return this.global.favCount(); }
  cartCount() { return this.global.cartCount(); }

  triggerInitialAnimation() {
    setTimeout(() => {
      this.handActive = true;
      this.linesActive = true;
      this.pageActive = true;
    }, 100);
  }

  onRefresh(event: any) {
    window.location.reload();
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

  // Navigation shortcuts
  goto() { this.router.navigate(['./home']); }
  cart() { this.router.navigate(['./my-cart']); }
  go() { this.router.navigate(['./homescr']); }
  expo() { this.router.navigate(['./explore']); }
  fvrt() { this.router.navigate(['./fav']); }
  pro() { this.router.navigate(['./account']); }
}
