import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, addOutline, airplaneOutline, arrowBackOutline, checkmarkCircle, checkmarkOutline, locationOutline, removeOutline, shareOutline, star } from 'ionicons/icons';
@Component({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-order-placed',
  templateUrl: './order-placed.page.html',
  styleUrls: ['./order-placed.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class OrderPlacedPage implements OnInit {

  constructor() {
             addIcons({ add,airplaneOutline,locationOutline, addOutline ,arrowBackOutline,shareOutline,removeOutline, star,checkmarkOutline});
    
   }

  ngOnInit() {
  }

}
