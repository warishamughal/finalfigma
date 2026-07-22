import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, 
  IonIcon, IonCheckbox, IonItem, IonLabel, IonList 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  add, addOutline, airplaneOutline, arrowBackOutline, 
  closeOutline, locationOutline, removeOutline, 
  shareOutline, star 
} from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
  standalone: true,
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon,
    IonCheckbox, IonItem, IonLabel, IonList,
    CommonModule, FormsModule
  ]
})
export class FiltersPage implements OnInit {
  selectedCategories: string[] = [];
  selectedPrices: string[] = [];

  categories: string[] = [
    'Fresh fruits & vegetables',
    'Cooking Oil & Ghee',
    'Meat & Fish',
    'Bakery & Snacks',
    'Dairy & Eggs',
    'Beverages'
  ];

  prices: string[] = ['200$', '400$', '800$', '1600$'];

  constructor(private router: Router) { 
    addIcons({ 
      add, airplaneOutline, locationOutline, addOutline, 
      arrowBackOutline, shareOutline, removeOutline, star, closeOutline 
    });
  }

  ngOnInit() {}

  toggleCategory(cat: string, event: any) {
    if (event.detail.checked) {
      this.selectedCategories.push(cat);
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== cat);
    }
  }

  togglePrice(price: string, event: any) {
    if (event.detail.checked) {
      this.selectedPrices.push(price);
    } else {
      this.selectedPrices = this.selectedPrices.filter(p => p !== price);
    }
  }

  applyFilters() {
    // ✅ Agar ek bhi empty hai to explore me products empty bhejo
    if (this.selectedCategories.length === 0 || this.selectedPrices.length === 0) {
      this.router.navigate(['/explore'], {
        queryParams: {
          categories: JSON.stringify([]),
          prices: JSON.stringify([])
        }
      });
      return;
    }

    // ✅ Agar dono selected hain to normal filters bhejo
    this.router.navigate(['/explore'], {
      queryParams: {
        categories: JSON.stringify(this.selectedCategories),
        prices: JSON.stringify(this.selectedPrices)
      }
    });
  }

  closePage() {
    this.router.navigate(['/explore']);
  }
  
}
