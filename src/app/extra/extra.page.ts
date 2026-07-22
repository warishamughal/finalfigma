import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonAlert, IonButton,  IonToast,IonPopover} from '@ionic/angular/standalone';

@Component({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-extra',
  templateUrl: './extra.page.html',
  styleUrls: ['./extra.page.scss'],
  standalone: true,
  
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonAlert, IonButton, IonToast, IonPopover]
})
export class ExtraPage implements OnInit {
 alertButtons = ['Action'];
  constructor() { }

  ngOnInit() {
  }
  

}
