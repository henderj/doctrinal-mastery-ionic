import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book';
import { IOFirebaseService } from './iofirebase.service';

interface RootState {
  books: Book[];
  tempBook: Book;
  useTempBook: boolean;
  currentBookIndex: number;
  currentUser: /* firebase.User | */ null;
  userData: object;

}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private _state: RootState = {
    books: [],
    tempBook: new Book('temp', []),
    useTempBook: false,
    currentBookIndex: 0,
    currentUser: null,
    userData: {}
  };

  public get state(): RootState { return this._state; }
  public get currentBook(): Book {
    if (this._state.useTempBook) { return this._state.tempBook; }

    return this._state.books[this._state.currentBookIndex];
  }


  public set books(value: Book[]) { this._state.books = value; }
  public set currentBookIndex(value: number) {
    if (value >= 0 && value < this._state.books.length) {
      this._state.useTempBook = false;

      this._state.currentBookIndex = value;
      // this._state.dataProvider.setCurrentBookIndex(value);
    }
  }
  public set useTempBook(value: boolean) { this._state.useTempBook = value; }
  public set tempBook(value: Book) {
    this._state.tempBook = value;
    this._state.useTempBook = true;
  }
  public set currentUser(value: /* firebase.User | */ null) { this._state.currentUser = value; }
  public set userData(value: any) {
    this._state.userData = value;
    this._state.currentBookIndex = value.currentBook;
  }


  public fetchUserData() {
    // const docID: string = this._state.currentUser === null ? 'null user' : this._state.currentUser.uid;
    // fb.usersCollection.doc(docID).get().then(res => {
    //   commit('setUserData', res.data())
    // }).catch(err => {
    //   console.log(err)
    // })
  }
  // async setDataProvider({ dispatch, commit }, provider) {
  //   commit('setDataProvider', provider);
  //   await dispatch('fetchBookData');
  // }
  public async fetchBookData() {
    this.IO.getBooks().then((books: Book[]) => {
      this.books = books;
    });
  }
  async saveItem(item) {
    this.IO.saveItem(item);
  }

  constructor(private IO: IOFirebaseService) { }
}
