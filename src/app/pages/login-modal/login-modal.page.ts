import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.page.html',
  styleUrls: ['./login-modal.page.scss'],
})
export class LoginModalPage implements OnInit {

  private static signInCallback: () => void;

  constructor(private modalController: ModalController) {
    LoginModalPage.signInCallback = () => this.close();
  }

  public static signInSuccess(authResult, redirectUrl): boolean {
    console.log('after sign in');
    LoginModalPage.signInCallback();

    return false;
  }

  ngOnInit() {
  }

  close(): void {
    this.modalController.dismiss();
  }
}
