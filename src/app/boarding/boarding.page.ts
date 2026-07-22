import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
@Component({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-boarding',
  templateUrl: './boarding.page.html',
  styleUrls: ['./boarding.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class BoardingPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
     goNextPage() {
    // 👉 Yahan apni page ka route likho jidr jana hai
    this.navCtrl.navigateForward('/login');
  }

}
