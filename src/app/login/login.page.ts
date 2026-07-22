import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem,
  IonLabel, IonInput, IonIcon, IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eye, eyeOff } from 'ionicons/icons';
import { AlertController, NavController } from '@ionic/angular';
import { Alert } from '../alert'; // ✅ your custom alert service

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem,
    IonLabel, IonInput, IonIcon, IonGrid, IonRow, IonCol, CommonModule, ReactiveFormsModule
  ]
})
export class LoginPage {
  loginForm!: FormGroup;

  // ✅ Demo user credentials
  users = [
    { username: 'warisha@gmail.com', password: '1&dYfgui' }
  ];

  // ✅ Attempt control variables
  wrongAttempts = 0;
  buttonDisabled = false;
  permanentDisabled = false;
  countdown = 0;
  round = 1;

  // ✅ Password visibility & animation
  showPassword = false;
  eyeIcon = 'eye';
  isPasswordFocused = false;
  isPasswordVisible = false;

  // ✅ Email focus state for floating label
  isEmailFocused = false;

  // ✅ Password strength conditions
  passwordConditions = {
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    special: false,
  };

  constructor(
    private fb: FormBuilder,
    private alertService: Alert,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {
    addIcons({ eye, eyeOff });

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // ✅ Getters for form fields
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  // 👁 Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.eyeIcon = this.showPassword ? 'eye-off' : 'eye';
    this.isPasswordVisible = this.showPassword;
  }

  // 📧 Email focus handlers (for floating label)
  onEmailFocus() {
    this.isEmailFocused = true;
  }

  onEmailBlur() {
    this.isEmailFocused = false;
  }

  // 🔐 Password focus & blur handling
  onPasswordFocus() {
    this.isPasswordFocused = true;
  }

  onPasswordBlur() {
    this.isPasswordFocused = false;
  }

  // 🖐️ Eye & hand animations
  getHandsClass(): string {
    if (this.isPasswordFocused && !this.isPasswordVisible) {
      return 'cover-eyes';
    } else if (this.isPasswordVisible) {
      return 'show-password';
    }
    return '';
  }

  getEyesStyle() {
    return {};
  }

  // 🚪 Main submit / login function
  async submit() {
    // ❌ Blocked permanently
    if (this.permanentDisabled) {
      await this.alertService.presentBlockedAlert();
      return;
    }

    // ❌ Invalid password pattern
    if (!this.allPasswordValid()) {
      await this.alertService.presentInvalidPasswordAlert();
      return;
    }

    // 🔍 Find user by email
    const foundUser = this.users.find(
      user => user.username === this.username?.value
    );

    // ❌ Wrong username
    if (!foundUser) {
      await this.alertService.presentWrongUsernameAlert();
      return;
    }

    // ❌ Wrong password
    if (!this.password?.value || foundUser.password !== this.password?.value) {
      this.wrongAttempts++;
      await this.alertService.presentWrongPasswordAlert();

      // 🔒 Lockout system
      if (this.round === 1 && this.wrongAttempts >= 3) {
        this.disableButtonForSeconds(10);
        this.round = 2;
        this.wrongAttempts = 0;
      } else if (this.round === 2 && this.wrongAttempts >= 2) {
        this.disableButtonForSeconds(20);
        this.round = 3;
        this.wrongAttempts = 0;
      } else if (this.round === 3 && this.wrongAttempts >= 1) {
        this.permanentDisabled = true;
        this.buttonDisabled = true;
        await this.alertService.presentBlockedAlert();
      }
      return;
    }

    // ✅ SUCCESS — show alert and go to home
    const successAlert = await this.alertCtrl.create({
      header: '✅ Login Successful!',
      message: 'Welcome back, Warisha!',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.navigateForward('/homescr'); // 👈 navigate after OK
          }
        }
      ]
    });

    await successAlert.present();

    // 🔄 Reset state
    this.wrongAttempts = 0;
    this.round = 1;
  }

  // ⏳ Disable login temporarily
  disableButtonForSeconds(seconds: number) {
    this.buttonDisabled = true;
    this.countdown = seconds;

    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(interval);
        if (!this.permanentDisabled) {
          this.buttonDisabled = false;
        }
      }
    }, 1000);
  }

  // 🔐 Validate password rules
  validatePassword() {
    const password = this.password?.value || '';
    this.passwordConditions.length = password.length >= 8;
    this.passwordConditions.uppercase = /[A-Z]/.test(password);
    this.passwordConditions.lowercase = /[a-z]/.test(password);
    this.passwordConditions.digit = /[0-9]/.test(password);
    this.passwordConditions.special = /[^A-Za-z0-9]/.test(password);
  }

  // ✅ Check if all conditions true
  allPasswordValid(): boolean {
    return Object.values(this.passwordConditions).every(cond => cond === true);
  }
}