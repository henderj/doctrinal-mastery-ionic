import { Component, OnInit, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';

import { Platform, ModalController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { LoginModalPage } from './pages/login-modal/login-modal.page';
import { AngularFireAuth } from '@angular/fire/auth';
import { IOFirebaseService } from './services/iofirebase.service';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
// import { LoginModalComponent } from './components/login-modal/login-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
