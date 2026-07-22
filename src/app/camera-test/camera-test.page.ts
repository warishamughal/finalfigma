import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonImg } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-camera-test',
  templateUrl: './camera-test.page.html',
  styleUrls: ['./camera-test.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonImg, CommonModule]
})
export class CameraTestPage {
  photo: string | undefined;

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      this.photo = image.dataUrl;
    } catch (error) {
      console.error('Camera error:', error);
    }
  }

  async pickFromGallery() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });
      this.photo = image.dataUrl;
    } catch (error) {
      console.error('Gallery error:', error);
    }
  }
}