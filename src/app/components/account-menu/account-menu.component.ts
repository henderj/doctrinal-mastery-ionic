import { Component, OnInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { IOFirebaseService } from 'src/app/services/iofirebase.service';
import { share } from 'rxjs/operators';
import { LoginModalPage } from 'src/app/pages/login-modal/login-modal.page';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss'],
})
export class AccountMenuComponent implements OnInit {
  loginModal: HTMLIonModalElement = null;
  user$: Observable<firebase.User>;

  private loggingOut = false;

  constructor(
    private modalController: ModalController,
    private fireAuth: AngularFireAuth,
    private ioFirebase: IOFirebaseService,
  ) { }


  ngOnInit(): void {
    this.ioFirebase.init();
    this.user$ = this.ioFirebase.currentUser$.pipe(share());

    // this.fireAuth.
  }

  async presentLoginModal() {
    const modal = await this.modalController.create({
      component: LoginModalPage,
      showBackdrop: true,
      backdropDismiss: true,
    });
    return await modal.present();
  }

  logout() {
    if (this.loggingOut) { return; }

    this.loggingOut = true;
    this.fireAuth.auth.signOut().then(() => this.loggingOut = false);
  }
}
