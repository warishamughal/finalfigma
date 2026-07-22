import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBadge, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  add, addOutline, airplaneOutline, arrowBackOutline, bagHandleOutline, cartOutline, 
  chevronForwardOutline, compassOutline, heart, heartOutline, locationOutline, person, 
  removeOutline, shareOutline, star 
} from 'ionicons/icons';
import { Router } from '@angular/router';
import { Global } from '../global';
import { FooterComponent } from '../footer/footer.component';
@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-fav',
  templateUrl: './fav.page.html',
  styleUrls: ['./fav.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, FooterComponent, IonBadge, IonIcon, IonButton, CommonModule, FormsModule]
})
export class FavPage implements OnInit {

  // ✅ Signals directly from global service
  favProducts = this.global.favProducts;   // signal
  favCount = this.global.favCount;         // computed signal
  cartCount = this.global.cartCount;       // computed signal

  activePage: string = 'favorites';
  currentActiveIndex: number = 3;
  navItems = ['shop', 'cart', 'explore', 'favorites', 'profile'];

  constructor(
    private router: Router,
    public global: Global
  ) {
    addIcons({ 
      add, addOutline, chevronForwardOutline, arrowBackOutline, heartOutline, heart,
      locationOutline, person, removeOutline, shareOutline, star, compassOutline, 
      bagHandleOutline, cartOutline, airplaneOutline 
    });
  }

  ngOnInit() {
    // ✅ Kuch nahi karna - signals auto reactive hain
  }

  // ✅ ionViewWillEnter bhi khaali
  ionViewWillEnter() {}

  toggleFav(item: any) {
    this.global.toggleFav(item);
    // ✅ Manually refresh nahi karna - signal auto update hoga
  }

  openProduct(item: any) {
    this.global.setProduct(item);
    this.router.navigate(['/productdetail']);
  }

  addAllToCart() {
    const products = this.favProducts(); // ✅ signal read
    products.forEach(item => this.global.addToCart(item));
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

  cart() { this.router.navigate(['./my-cart']); }
  go() { this.router.navigate(['./homescr']); }
  expo() { this.router.navigate(['./explore']); }
  fvrt() { this.router.navigate(['./fav']); }
  pro() { this.router.navigate(['./account']); }
}