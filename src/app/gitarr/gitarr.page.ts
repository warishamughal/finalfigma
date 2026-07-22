import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRange } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gitarr',
  templateUrl: './gitarr.page.html',
  styleUrls: ['./gitarr.page.scss'],
  standalone: true,
  imports: [IonContent, IonRange, CommonModule, FormsModule]
})
export class GitarrPage implements OnInit {
  // Control values
  closeValue: number = 50;
  abValue: number = 50;
  closePan: number = 0;
  abPan: number = 0;
  releaseValue: number = 12.5;
  
  // Bottom control values
  transpose: number = 0;
  dynamicCC: number = 1;
  sampleOffset: number = -80;

  constructor() { }

  ngOnInit() {
  }

  // Event handlers
  updateClosePan(event: any) {
    this.closePan = event.detail.value;
  }

  updateAbPan(event: any) {
    this.abPan = event.detail.value;
  }

  updateRelease(event: any) {
    this.releaseValue = event.detail.value;
  }

  // Optional: Knob rotation handlers
  updateCloseKnob(value: number) {
    this.closeValue = value;
  }

  updateAbKnob(value: number) {
    this.abValue = value;
  }
}