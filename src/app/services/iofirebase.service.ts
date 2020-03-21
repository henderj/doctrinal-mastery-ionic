import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { Book } from '../interfaces/book';
import { Item, ItemType } from '../interfaces/item';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { updateBookDataImplicit } from './FirestoreDataService.js';

import bookOfMormon from '../../assets/book-data/book of mormon.json';
import doctrineAndCovenants from '../../assets/book-data/doctrine and covenants.json';
import newTestament from '../../assets/book-data/new testament.json';
import oldTestament from '../../assets/book-data/old testament.json';
import { Subject, Observable } from 'rxjs';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { runInThisContext } from 'vm';

@Injectable({
  providedIn: 'root'
})
export class IOFirebaseService {

  private initialized = false;

  private _currentUser: firebase.User | null;
  public get currentUser(): firebase.User | null { return this._currentUser; }
  // public set currentUser(value: firebase.User | null) { this._currentUser = value; }

  private _currentUser$ = new Subject<User>();
  public currentUser$ = this._currentUser$.asObservable();

  // private _isLoggedOn = new Subject<boolean>();
  // public isLoggedOn$ = this._isLoggedOn.asObservable();

  constructor(private firestore: AngularFirestore, private fireAuth: AngularFireAuth) { }

  private get usersCollection(): AngularFirestoreCollection {
    return this.firestore.collection('users');
  }

  public init() {
    if (this.initialized) { return; }

    console.log('service before auth');
    this.fireAuth.auth.onAuthStateChanged(user => {
      console.log('service after auth');
      this.onAuthChanged(user);
    });

    this.initialized = true;
  }


  private onAuthChanged(user: firebase.User) {
    console.log('logged in: ', user);
    if (user) {
      this._currentUser = user;
    } else {
      this._currentUser = null;
    }
    this._currentUser$.next(user);

  }

  public async getUserData(): Promise<any> {
    const docID = this._currentUser === null ? 'null user' : this._currentUser.uid;
    const dataDoc = this.fetchUserDataDocCustom(docID);

    let snap = await dataDoc.get().toPromise();
    snap = await this.createDocIfEmpty(snap, dataDoc);
    return Promise.resolve(snap.data());
  }

  public setCurrentBookIndex(index: number): void {
    const userDoc = this.fetchUserDataDoc();

    if (userDoc === undefined) { return; }

    userDoc.update({ currentBook: index });
  }

  public async getCurrentBookIndex(): Promise<number> {
    const userDoc = await this.fetchUserDataDocPromise();
    const data = (await userDoc.get().toPromise()).data();

    if (data === undefined) {
      return Promise.reject();
    }

    return Promise.resolve(data.currentBook);
  }

  public getBooks(): Promise<Book[]> {
    const books = this.getBaseData();

    const currentUser = this._currentUser;
    if (currentUser === null) {
      console.log('No current user. Returning default data...');
      return Promise.resolve(books);
    }

    const userDoc = this.usersCollection.doc(currentUser.uid);

    const userDocSnap = userDoc.get().toPromise()
      .then(snap => this.createDocIfEmpty(snap, userDoc))
      .then(() => this.updateLocalBookData(books, userDoc))
      .catch(err => {
        console.error('Error getting document', err);
      });

    return Promise.resolve(books);
  }

  public saveItem(item: Item): void {
    this.fetchUserDataDocPromise()
      .then(userDataDoc => {
        const savedItemCollection = userDataDoc.collection('savedItems');
        const savedItemDoc = savedItemCollection.doc(item.ID.toString());
        return savedItemDoc.get().toPromise();
      })
      .then(snapshot => {
        if (!snapshot.exists) {
          console.log('No matching documents for id: ' + item.ID + '. Creating new doc...');
          snapshot.ref.set({
            ID: item.ID,
            data: item.getItemStateData()
          });
          return;
        }
        snapshot.ref.update({
          data: item.getItemStateData()
        });
      })
      .catch(err => {
        console.error('Error saving Item', err);
      });
  }



  private fetchUserDataDoc(): AngularFirestoreDocument | undefined {
    const currentUser = this._currentUser;
    if (currentUser === null) {
      console.log('No current user. Returning undefined...');
      return undefined;
    }

    const userData = this.usersCollection.doc(currentUser.uid);
    return userData;
  }

  private fetchUserDataDocCustom(uid: string): AngularFirestoreDocument | undefined {
    const userData = this.usersCollection.doc(uid);
    return userData;
  }

  private async fetchUserDataDocPromise(): Promise<AngularFirestoreDocument> {
    const currentUser = this._currentUser;
    if (currentUser === null) {
      console.log('No current user. Rejecting...');
      return Promise.reject();
    }
    const userData = this.usersCollection.doc(currentUser.uid);
    return Promise.resolve(userData);
  }

  private async createDocIfEmpty(doc: firebase.firestore.DocumentSnapshot,
    userData: AngularFirestoreDocument): Promise<firebase.firestore.DocumentSnapshot> {
    if (!doc.exists) {
      console.log('Cannot find userData for current user. Creating doc...');
      await userData.set({
        currentBook: 0
      });
      return await Promise.resolve(userData.get().toPromise());
    } else {
      return Promise.resolve(doc);
    }
  }

  private async updateLocalBookData(books: Book[], userDoc: AngularFirestoreDocument): Promise<void> {
    const snapshot = await userDoc.collection('savedItems').get().toPromise();
    const savedItems = snapshot.docs.map(doc => doc.data());

    updateBookDataImplicit(books, savedItems);

  }

  private getBaseData(): Book[] {
    let nextID = 100;
    const oldTestamentItems: Item[] = [];
    oldTestament.doctrines.forEach(doctrine => {
      const reference: string = doctrine.book + ' ' + doctrine.chapter + ':' + doctrine.verse;
      oldTestamentItems.push(new Item(nextID, ItemType.Doctrine, reference, doctrine.content));
      nextID++;
      oldTestamentItems.push(new Item(nextID, ItemType.Reference, doctrine.content, reference));
      nextID++;
    });
    const oldTestamentBook: Book = new Book('Old Testament', oldTestamentItems);
    nextID = 200;
    const newTestamentItems: Item[] = [];
    newTestament.doctrines.forEach(doctrine => {
      const reference: string = doctrine.book + ' ' + doctrine.chapter + ':' + doctrine.verse;
      newTestamentItems.push(new Item(nextID, ItemType.Doctrine, reference, doctrine.content));
      nextID++;
      newTestamentItems.push(new Item(nextID, ItemType.Reference, doctrine.content, reference));
      nextID++;
    });
    const newTestamentBook: Book = new Book('New Testament', newTestamentItems);
    nextID = 300;
    const bookOfMormonItems: Item[] = [];
    bookOfMormon.doctrines.forEach(doctrine => {
      const reference: string = doctrine.book + ' ' + doctrine.chapter + ':' + doctrine.verse;
      bookOfMormonItems.push(new Item(nextID, ItemType.Doctrine, reference, doctrine.content));
      nextID++;
      bookOfMormonItems.push(new Item(nextID, ItemType.Reference, doctrine.content, reference));
      nextID++;
    });
    const bookOfMormonBook: Book = new Book('Book of Mormon', bookOfMormonItems);
    nextID = 40;
    const doctrineAndCovenantsItems: Item[] = [];
    doctrineAndCovenants.doctrines.forEach(doctrine => {
      const reference: string = doctrine.book + ' ' + doctrine.chapter + ':' + doctrine.verse;
      doctrineAndCovenantsItems.push(new Item(nextID, ItemType.Doctrine, reference, doctrine.content));
      nextID++;
      doctrineAndCovenantsItems.push(new Item(nextID, ItemType.Reference, doctrine.content, reference));
      nextID++;
    });
    const doctrineAndCovenantsBook: Book = new Book('Doctrine and Covenants', doctrineAndCovenantsItems);
    return [oldTestamentBook, newTestamentBook, bookOfMormonBook, doctrineAndCovenantsBook];
  }
}
