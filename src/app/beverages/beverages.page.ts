import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, addOutline, arrowBackOutline, chevronBackOutline, ellipsisHorizontal } from 'ionicons/icons';
import { Data } from '../data';   
import { Global } from '../global'; 
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-beverages',
  templateUrl: './beverages.page.html',
  styleUrls: ['./beverages.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, CommonModule, FormsModule]
})
export class BeveragesPage implements OnInit {
  product: any[] = [];  

  constructor(private data: Data, private location: Location, private global: Global ,private router: Router) { 
    addIcons({ chevronBackOutline, ellipsisHorizontal, arrowBackOutline, addOutline });
  }
openProduct(item: any) {
    this.global.setProduct(item);       // Product global mein store
    this.router.navigate(['/productdetail']);  // Detail page pe bhejna
  }

  ngOnInit() {
    this.product = this.data.getbeveragesproducts();
  }

  goBack() {
    this.location.back();
  }
}
