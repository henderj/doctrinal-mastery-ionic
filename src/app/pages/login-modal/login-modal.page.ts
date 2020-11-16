import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.page.html',
  styleUrls: ['./login-modal.page.scss'],
})
export class LoginModalPage implements OnInit {

  private static signInCallback: () => void;

  constructor(private modalController: ModalController, private router: Router) {
    LoginModalPage.signInCallback = () => {
      this.close();
      // this.router.navigate(['/home'], { replaceUrl: true }); 
    }
  }

  public static signInSuccess(authResult, redirectUrl): boolean {
    console.log('after sign in');
    LoginModalPage.signInCallback();

    // return false;
    return true;
  }

  ngOnInit() {
  }

  close(): void {
    this.modalController.dismiss();
  }
}
