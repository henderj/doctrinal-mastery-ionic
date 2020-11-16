import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IOFirebaseService } from 'src/app/services/iofirebase.service';
import { share } from 'rxjs/operators';
import { StoreService } from 'src/app/services/store.service';
import { Book } from 'src/app/interfaces/book';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  displayName = '';

  constructor(private store: StoreService, private ioFirebase: IOFirebaseService) { }

  get userName(): string {
    if (this.ioFirebase.currentUser) {
      return ' Back, ' + this.ioFirebase.currentUser.displayName;
    }
    return '';
  }

  get currentBook(): Book {
    // console.log(this.store.currentBook);
    // return this.store.currentBook;
    return this.store.currentBook;
  }

}
