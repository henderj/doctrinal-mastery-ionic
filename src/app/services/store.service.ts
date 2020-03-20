import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book';
import { IOFirebaseService } from './iofirebase.service';
import { Item } from '../interfaces/item';

interface RootState {
  books: Book[];
  tempBook: Book;
  useTempBook: boolean;
  currentBookIndex: number;
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
      this.IO.setCurrentBookIndex(value);
    }
  }
  public set useTempBook(value: boolean) { this._state.useTempBook = value; }
  public set tempBook(value: Book) {
    this._state.tempBook = value;
    this._state.useTempBook = true;
  }
  public set userData(value: any) {
    this._state.userData = value;
    this._state.currentBookIndex = value.currentBook;
  }


  public fetchUserData() {
    this.IO.getUserData().then((data: any) => {
      this.userData = data;
    }).catch((err: any) => {
      console.log(err);
    });
  }

  public async fetchBookData() {
    this.IO.getBooks().then((books: Book[]) => {
      this.books = books;
    });
  }

  public async saveItem(item: Item) {
    this.IO.saveItem(item);
  }

  constructor(private IO: IOFirebaseService) { }
}
