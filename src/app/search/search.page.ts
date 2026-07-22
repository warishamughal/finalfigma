import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, addOutline, arrowBackOutline, bagHandleOutline, cartOutline, chevronBackOutline, compassOutline, ellipsisHorizontal, heartOutline, optionsOutline, person, } from 'ionicons/icons';
import { Router } from '@angular/router';
import { Data } from '../data';   
import { Global } from '../global'; 


@Component({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SearchPage implements OnInit {

 product: any[] = [];  

activePage: string = 'shop';
  currentActiveIndex: number = 0; // Track current active tab
  navItems = ['shop', 'cart', 'explore', 'favorites', 'profile'];
  constructor( private router:Router,private data: Data, private global: Global ) { 
                 addIcons({ arrowBackOutline,addOutline,compassOutline,bagHandleOutline,cartOutline,person,heartOutline});
    
  }

  setActive(page: string) {
    // Find the index of the clicked page
    const clickedIndex = this.navItems.indexOf(page);
    
    const clickedItem = document.querySelector(`.nav-item.${page}`);
    
    // Determine direction of movement
    const isMovingRight = clickedIndex > this.currentActiveIndex;
    const isMovingLeft = clickedIndex < this.currentActiveIndex;
    
    // Add movement animation classes
    if (isMovingRight && clickedItem) {
      clickedItem.classList.add('moving-right');
      // Remove class after animation
      setTimeout(() => {
        clickedItem.classList.remove('moving-right');
      }, 600);
    }
    
    if (isMovingLeft && clickedItem) {
      clickedItem.classList.add('moving-left');
      // Remove class after animation
      setTimeout(() => {
        clickedItem.classList.remove('moving-left');
      }, 600);
    }
    
    // Add wave effect
    if (clickedItem) {
      clickedItem.classList.add('wave-effect');
      setTimeout(() => {
        clickedItem.classList.remove('wave-effect');
      }, 600);
    }
    
    // Remove active class from all items
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    
    // Add active class to clicked item
    if (clickedItem) {
      clickedItem.classList.add('active');
    }
    
    // Update current index and active page
    this.currentActiveIndex = clickedIndex;
    this.activePage = page;
  }
openProduct(item: any) {
    this.global.setProduct(item);       // Product global mein store
    this.router.navigate(['/productdetail']);  // Detail page pe bhejna
  }
  ngOnInit() {
          this.product = this.data.getsearchproducts();

    // Set initial active state for explore tab (since this is explore page)
    setTimeout(() => {
      const exploreItem = document.querySelector('.nav-item.explore');
      
      if (exploreItem) {
        exploreItem.classList.add('active');
      }
    }, 100);
    
    // Set the active page to explore and update the index
    this.activePage = 'explore';
    this.currentActiveIndex = 2; // explore is at index 2 in navItems array
  }

}