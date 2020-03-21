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

  public currentBookDebug(caller: string): Book {
    // console.log('store: currentBookDebug', caller);
    return this.currentBook;
  }
  public get currentBook(): Book {
    let book: Book;
    if (this._state.useTempBook) {
      book = this._state.tempBook;
    } else {
      book = this._state.books[this._state.currentBookIndex];
    }
    // console.log('store: get currentBook', book);
    return book;
    // if (this._state.useTempBook) { return this._state.tempBook; }

    // return this._state.books[this._state.currentBookIndex];
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
    console.log('store: set userData', value.currentBook);
  }


  public async fetchAllData() {
    this.IO.init();
    await this.fetchUserData();
    await this.fetchBookData();
  }

  private async fetchUserData() {
    await this.IO.getUserData().then((data: any) => {
      this.userData = data;
      console.log('fetchUserData', data);
    }).catch((err: any) => {
      console.log(err);
    });
  }

  private async fetchBookData() {
    await this.IO.getBooks().then((books: Book[]) => {
      this.books = books;
    });
  }

  public async saveItem(item: Item) {
    this.IO.saveItem(item);
  }

  constructor(private IO: IOFirebaseService) { }
}
