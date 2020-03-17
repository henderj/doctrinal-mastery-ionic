import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { Book } from '../interfaces/book';
import { Item, ItemType } from '../interfaces/item';
import bookOfMormon from '../../assets/book-data/book of mormon.json';
import doctrineAndCovenants from '../../assets/book-data/doctrine and covenants.json';
import newTestament from '../../assets/book-data/new testament.json';
import oldTestament from '../../assets/book-data/old testament.json';

@Injectable({
  providedIn: 'root'
})
export class IOFirebaseService {

  constructor(private store: StoreService) { }


  public setCurrentBookIndex(index: number): void {
    // const userDoc = this.fetchUserDataDoc();

    // if (userDoc === undefined) { return; }

    // userDoc.update({currentBook: index});
  }

  // public async getCurrentBookIndex(): Promise<number> {
  // const userDoc = await this.fetchUserDataDocAsync();
  // const data = (await userDoc.get()).data();

  // if (data === undefined) {
  //     return Promise.reject();
  // }

  // return Promise.resolve(data.currentBook);
  // }

  public getBooks(): Promise<Book[]> {
    const books = this.getBaseData();

    const currentUser = this.store.state.currentUser;
    if (currentUser === null) {
      console.log('No current user. Returning default data...');
      return Promise.resolve(books);
    }

    // const userDoc = fb.usersCollection.doc(currentUser.uid);

    // const userDocSnap = userDoc.get()
    //     .then(snap => this.createDocIfEmpty(snap, userDoc))
    //     .then(snap => this.updateBookData(books, userDoc, snap))
    //     .catch(err => {
    //         console.error('Error getting document', err);
    //     });

    return Promise.resolve(books);
  }

  public saveItem(item: Item): void {
    // this.fetchUserDataDocAsync()
    //     .then(userDataDoc => {
    //         const savedItemCollection = userDataDoc.collection('savedItems');
    //         const savedItemDoc = savedItemCollection.doc(item.ID.toString());
    //         return savedItemDoc.get();
    //     })
    //     .then(snapshot => {
    //         if (!snapshot.exists) {
    //             console.log('No matching documents for id: ' + item.ID + '. Creating new doc...');
    //             snapshot.ref.set({
    //                 ID: item.ID,
    //                 data: item.getItemStateData()
    //             });
    //             return;
    //         }
    //         snapshot.ref.update({
    //             data: item.getItemStateData()
    //         });
    //     })
    //     .catch(err => {
    //         console.error('Error saving Item', err);
    //     });
  }

  // private fetchUserDataDoc(): firebase.firestore.DocumentReference | undefined {
  //     const currentUser = this._store.state.currentUser;
  //     if (currentUser === null) {
  //         console.log('No current user. Returning undefined...');
  //         return undefined;
  //     }

  //     const userData = fb.usersCollection.doc(currentUser.uid);
  //     return userData;
  // }

  // private async fetchUserDataDocAsync(): Promise<firebase.firestore.DocumentReference> {
  //     const currentUser = this._store.state.currentUser;
  //     if (currentUser === null) {
  //         console.log('No current user. Rejecting...');
  //         return Promise.reject();
  //     }

  //     const userData = fb.usersCollection.doc(currentUser.uid);
  //     return Promise.resolve(userData);
  // }

  // private async createDocIfEmpty(doc: firebase.firestore.DocumentSnapshot,
  //                                userData: firebase.firestore.DocumentReference): Promise<firebase.firestore.DocumentSnapshot> {
  //     if (!doc.exists) {
  //         console.log('Cannot find userData for current user. Creating doc...');
  //         await userData.set({
  //             currentBook: 0
  //         });
  //         return await Promise.resolve(userData.get());
  //     } else {
  //         return Promise.resolve(doc);
  //     }
  // }

  // private async updateBookData(books: Book[], doc: firebase.firestore.DocumentReference, snap: firebase.firestore.DocumentSnapshot): Promise<void> {
  //     const data: firebase.firestore.DocumentData | undefined = snap.data();

  //     if (data === undefined) {
  //         console.warn('Warning! data is undefined');
  //         return;
  //     }

  //     const snapshot = await doc.collection('savedItems').get();
  //     const savedItems = snapshot.docs.map(doc => doc.data());

  //     updateBookDataImplicit(books, savedItems);

  // }

  private getBaseData() {
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
