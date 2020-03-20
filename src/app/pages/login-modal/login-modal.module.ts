import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginModalPageRoutingModule } from './login-modal-routing.module';

import { LoginModalPage } from './login-modal.page';
import { FirebaseUIModule } from 'firebaseui-angular';
import { environment } from 'src/environments/environment';

const firebaseUIAuthConfig: firebaseui.auth.Config = {
  ...environment.firebaseUIAuthConfig,
  callbacks: {
    signInSuccessWithAuthResult: LoginModalPage.signInSuccess
  }
};


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginModalPageRoutingModule,
    FirebaseUIModule.forRoot(firebaseUIAuthConfig),
  ],
  declarations: [LoginModalPage]
})
export class LoginModalPageModule { }
