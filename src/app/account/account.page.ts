import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, 
  IonIcon, IonModal, IonFooter, IonBadge, IonImg, IonGrid, 
  IonRow, IonCol, IonAvatar, IonList, IonItem, IonLabel, 
  ActionSheetController, IonCard, IonCardHeader, IonCardTitle, IonCardContent
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  add, addOutline, airplaneOutline, arrowBackOutline, bagHandleOutline, 
  cardOutline, cartOutline, chevronForwardOutline, compassOutline, 
  heartOutline, helpCircleOutline, informationCircleOutline, locationOutline, 
  logOutOutline, notificationsOutline, person, personOutline, removeOutline, 
  shareOutline, star, ticketOutline, closeOutline, camera, images, createOutline,
  phonePortraitOutline, hardwareChipOutline, batteryChargingOutline
} from 'ionicons/icons';
import { Router } from '@angular/router';
import { Alert } from '../alert';
import { Global } from '../global';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Device } from '@capacitor/device';
import { Network } from '@capacitor/network';
import { FooterComponent } from '../footer/footer.component';
@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButton,
    IonIcon, IonModal, IonFooter, IonBadge, IonImg, IonGrid,
    IonRow, IonCol, IonAvatar, IonList, IonItem, IonLabel,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    CommonModule, FormsModule, FooterComponent
  ]
})
export class AccountPage implements OnInit {
  activePage: string = 'profile';
  currentActiveIndex: number = 4;
  navItems: string[] = ['shop', 'cart', 'explore', 'favorites', 'profile'];

  // ✅ Signals from global service
  favProducts = this.global.favProducts;   // signal
  favCount = this.global.favCount;         // computed signal
  cartCount = this.global.cartCount;       // computed signal

  photo: string | undefined;
  deviceInfo: any = null;
  showDeviceInfo: boolean = false;
  
  constructor(
    private router: Router,
    private alert: Alert,
    public global: Global,
    private actionSheetCtrl: ActionSheetController
  ) {
    addIcons({ 
      add, addOutline, airplaneOutline, arrowBackOutline,
      heartOutline, locationOutline, person, removeOutline,
      shareOutline, star, compassOutline, bagHandleOutline,
      cartOutline, chevronForwardOutline, personOutline, cardOutline,
      ticketOutline, informationCircleOutline, helpCircleOutline,
      notificationsOutline, logOutOutline, closeOutline, camera, 
      images, createOutline, phonePortraitOutline, hardwareChipOutline,
      batteryChargingOutline
    });
  }

  ngOnInit(): void {
    // ✅ Kuch nahi karna - signals auto reactive hain
    setTimeout(() => {
      const profileItem = document.querySelector('.nav-item.profile');
      if (profileItem) profileItem.classList.add('active');
    }, 100);
  }

  // ✅ ionViewWillEnter khaali
  ionViewWillEnter(): void {}

  async presentFailAlert(): Promise<void> {
    await this.alert.presentFailAlert(); 
  }

  async changeProfilePicture(): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Change Profile Picture',
      cssClass: 'custom-action-sheet',
      buttons: [
        {
          text: 'Take Photo',
          icon: 'camera',
          handler: () => { this.takePicture(); }
        },
        {
          text: 'Choose from Gallery',
          icon: 'images',
          handler: () => { this.pickFromGallery(); }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async takePicture(): Promise<void> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      this.photo = image.dataUrl;
    } catch (error) {
      console.error('Camera error:', error);
    }
  }

  async pickFromGallery(): Promise<void> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });
      this.photo = image.dataUrl;
    } catch (error) {
      console.error('Gallery error:', error);
    }
  }

  async showDeviceInfoModal(): Promise<void> {
    await this.loadDeviceInfo();
    this.showDeviceInfo = true;
  }

  closeDeviceInfo(): void {
    this.showDeviceInfo = false;
  }

  async loadDeviceInfo(): Promise<void> {
    try {
      const info = await Device.getInfo();
      const platform = info.platform;
      
      if (platform === 'web') {
        this.deviceInfo = await this.getBrowserInfoWithNetwork();
        return;
      }
      
      const deviceId = await Device.getId();
      const batteryInfo = await Device.getBatteryInfo();
      const languageCode = await Device.getLanguageCode();
      const networkStatus = await Network.getStatus();
      
      let idValue = 'Unknown';
      if (deviceId) {
        idValue = (deviceId as any).identifier || (deviceId as any).uuid || String(deviceId) || 'Unknown';
      }
      
      this.deviceInfo = {
        model: info.model || 'Unknown',
        platform: info.platform || 'Unknown',
        operatingSystem: info.operatingSystem || 'Unknown',
        osVersion: info.osVersion || 'Unknown',
        manufacturer: info.manufacturer || 'Unknown',
        isVirtual: info.isVirtual ? 'Yes' : 'No',
        memUsed: info.memUsed ? (info.memUsed / (1024 * 1024 * 1024)).toFixed(2) + ' GB' : 'N/A',
        webViewVersion: info.webViewVersion || 'Unknown',
        deviceId: idValue,
        batteryLevel: batteryInfo.batteryLevel ? (batteryInfo.batteryLevel * 100).toFixed(0) + '%' : 'N/A',
        isCharging: batteryInfo.isCharging ? 'Yes' : 'No',
        language: languageCode.value || 'en',
        networkConnected: networkStatus.connected ? 'Yes' : 'No',
        connectionType: networkStatus.connectionType || 'Unknown',
        networkStrength: this.getNetworkStrength(networkStatus.connectionType)
      };
    } catch (error) {
      console.error('Device info error:', error);
      this.deviceInfo = { error: 'Failed to load device information. Please try again.' };
    }
  }

  async getBrowserInfoWithNetwork(): Promise<any> {
    const nav = window.navigator as any;
    const screen = window.screen;
    const networkStatus = await Network.getStatus();
    
    let browserName = 'Unknown';
    if (nav.userAgent.indexOf('Chrome') > -1) browserName = 'Chrome';
    else if (nav.userAgent.indexOf('Safari') > -1) browserName = 'Safari';
    else if (nav.userAgent.indexOf('Firefox') > -1) browserName = 'Firefox';
    else if (nav.userAgent.indexOf('Edge') > -1) browserName = 'Edge';
    
    let osName = 'Unknown';
    if (nav.userAgent.indexOf('Win') > -1) osName = 'Windows';
    else if (nav.userAgent.indexOf('Mac') > -1) osName = 'MacOS';
    else if (nav.userAgent.indexOf('Linux') > -1) osName = 'Linux';
    else if (nav.userAgent.indexOf('Android') > -1) osName = 'Android';
    else if (nav.userAgent.indexOf('iOS') > -1) osName = 'iOS';
    
    return {
      model: browserName + ' Browser',
      platform: 'Web',
      operatingSystem: osName,
      osVersion: 'N/A',
      manufacturer: 'Browser',
      isVirtual: 'N/A',
      memUsed: nav.deviceMemory ? nav.deviceMemory + ' GB' : 'N/A',
      webViewVersion: nav.userAgent.substring(0, 50) + '...',
      deviceId: 'Web Device',
      batteryLevel: 'N/A (Web)',
      isCharging: 'N/A',
      language: nav.language || 'en',
      screenResolution: `${screen.width} x ${screen.height}`,
      colorDepth: screen.colorDepth + ' bit',
      networkConnected: networkStatus.connected ? 'Yes' : 'No',
      connectionType: networkStatus.connectionType || 'Unknown',
      networkStrength: this.getNetworkStrength(networkStatus.connectionType)
    };
  }

  getNetworkStrength(connectionType: string): string {
    switch(connectionType) {
      case 'wifi': return 'WiFi - Strong';
      case 'cellular': return 'Mobile Data';
      case '4g': return '4G - Fast';
      case '3g': return '3G - Moderate';
      case '2g': return '2G - Slow';
      case 'none': return 'No Connection';
      default: return 'Unknown';
    }
  }

  setActive(page: string): void {
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

  go(): void { this.router.navigate(['./homescr']); }
  cart(): void { this.router.navigate(['./my-cart']); }
  expo(): void { this.router.navigate(['./explore']); }
  fvrt(): void { this.router.navigate(['./fav']); }
  pro(): void { this.router.navigate(['./account']); }
}