import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Global } from '../global';
import { IonFooter, IonToolbar, IonIcon, IonBadge } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bagHandleOutline, cartOutline, compassOutline, heartOutline, person } from 'ionicons/icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, IonFooter, IonToolbar, IonIcon, IonBadge]
})
export class FooterComponent implements OnInit {

  activePage: string = 'shop';
  currentActiveIndex: number = 0;
  navItems = ['shop', 'cart', 'explore', 'favorites', 'profile'];

  constructor(private router: Router, public global: Global) {
    addIcons({ bagHandleOutline, cartOutline, compassOutline, heartOutline, person });
  }

  ngOnInit() {
    // Set active page based on current route
    const currentRoute = this.router.url;
    if (currentRoute.includes('my-cart')) this.activePage = 'cart';
    else if (currentRoute.includes('explore')) this.activePage = 'explore';
    else if (currentRoute.includes('fav')) this.activePage = 'favorites';
    else if (currentRoute.includes('account')) this.activePage = 'profile';
    else this.activePage = 'shop';
  }

  favCount() { return this.global.favCount(); }
  cartCount() { return this.global.cartCount(); }

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

  go()   { this.router.navigate(['./homescr']); }
  cart() { this.router.navigate(['./my-cart']); }
  expo() { this.router.navigate(['./explore']); }
  fvrt() { this.router.navigate(['./fav']); }
  pro()  { this.router.navigate(['./account']); }
}