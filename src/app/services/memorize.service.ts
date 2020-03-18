import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Item, ItemType } from '../interfaces/item';
import { removeItemFromArray } from '../utils';
import { Book } from '../interfaces/book';
import { ChallengePayload } from '../interfaces/ChallengePayload';
import { MemorizeChallenges } from '../enums/memorize-challenges.enum';
import { NextItemPayload } from '../interfaces/NextItemPayload';
import { Router } from '@angular/router';
import { StoreService } from './store.service';



interface MemorizeState {
  currentScore: number;
  currentItems: Item[];
  currentItemIndex: number;
  masteredItems: Item[];
}

@Injectable({
  providedIn: 'root'
})
export class MemorizeService {

  get book(): Book {
    return this.currentBook;
  }

  get currentProperties(): object {
    return {
      book: this.book,
      item: this.state.currentItems[this.state.currentItemIndex]
    };
  }

  get currentItem(): Item {
    return this.state.currentItems[this.state.currentItemIndex];
  }

  get progressPercent(): number {
    let percent: number = Math.abs(this.state.currentScore / this.maxScore);
    if (percent > 1) { percent = 1; }
    if (percent < 0) { percent = 0; }

    return percent;
  }

  constructor(private router: Router, private store: StoreService) { }
  readonly MaxCurrentItems = 4;

  readonly debugBook = new Book('test', [
    new Item(900, ItemType.Doctrine, 'test 1: reference(Q)', 'test 1: doctrine(A)'),
    new Item(901, ItemType.Reference, 'test 1: doctrine(Q)', 'test 1: reference(A)'),
    new Item(902, ItemType.Doctrine, 'test 2: reference(Q)', 'test 2: doctrine(A)'),
    new Item(903, ItemType.Reference, 'test 2: doctrine(Q)', 'test 2: reference(A)'),
    new Item(904, ItemType.Doctrine, 'test 3: reference(Q)', 'test 3: doctrine(A)'),
    new Item(905, ItemType.Reference, 'test 3: doctrine(Q)', 'test 3: reference(A)'),
    new Item(906, ItemType.Doctrine, 'test 4: reference(Q)', 'test 4: doctrine(A)'),
    new Item(907, ItemType.Reference, 'test 4: doctrine(Q)', 'test 4: reference(A)'),
  ]);
  readonly defaultState: MemorizeState = {
    currentScore: 0,
    currentItems: [],
    currentItemIndex: 0,
    masteredItems: [],
  };

  maxScore = 10;
  currentBook: Book = this.debugBook;
  state: MemorizeState = {
    currentScore: 0,
    currentItems: [],
    currentItemIndex: 0,
    masteredItems: []
  };

  private onNextItemSource = new Subject<NextItemPayload>();
  onNextItem$ = this.onNextItemSource.asObservable();


  private static calcMaxScore(book: Book): number {
    if (book.pointsLeft <= 0) { return 10; }

    if (book.pointsLeft > 10) { return 10; }

    return book.pointsLeft;
  }

  public startNewSession(book: Book): void {
    this.resetProperties();

    this.currentBook = book;
    this.maxScore = MemorizeService.calcMaxScore(book);

    this.continueSession();
  }

  private resetProperties() {
    this.state = {
      currentScore: 0,
      currentItems: [],
      currentItemIndex: 0,
      masteredItems: []
    };
  }

  private nextView(item: Item): MemorizeChallenges {
    if (item.score >= Item.MaxScore - 1) {
      return MemorizeChallenges.Card;
    }

    return MemorizeChallenges.MultipleChoice;
  }

  private getNextItemIndex(): number {
    const nextItem = this.getNextItem();
    const nextItemIndex = this.state.currentItems.indexOf(nextItem);

    if (nextItemIndex === -1) {
      this.state.currentItems.push(nextItem);
      return this.state.currentItems.length - 1;
    }

    return nextItemIndex;
  }

  private getNextItem(): Item {
    if (this.state.currentItems.length >= this.MaxCurrentItems) {
      return this.state.currentItems[Math.floor(Math.random() * this.state.currentItems.length)];
    }

    let nextItem: Item;

    if (this.book.itemsNotSeen.length + this.book.itemsLearning.length > 0) {
      nextItem = this.book.chooseRandomSingle(
        this.book.itemsNotSeen.concat(this.book.itemsLearning)
      );

      return nextItem;
    }

    nextItem = this.book.chooseRandomSingle(this.book.itemsMastered);
    return nextItem;
  }

  private continueSession(): void {
    this.state.currentItemIndex = this.getNextItemIndex();
    const nextView = this.nextView(this.currentItem);

    this.onNextItemSource.next({ item: this.currentItem, view: nextView });
  }

  private finishSession(): void {
    // this.$store.commit('updateMasteredItems', {
    //   masteredItems: this.masteredItems
    // });
    this.router.navigate(['/finished']);
  }

  onFinished(payload: ChallengePayload) {

    if (payload.correct) {
      this.currentItem.incrementScore(payload.scoreDelta);

      // this.$store.dispatch('saveItem', this.currentItem);
      this.store.saveItem(this.currentItem);

      if (this.currentItem.mastered) {
        this.state.masteredItems.push(this.currentItem);
        removeItemFromArray(this.currentItem, this.state.currentItems);
      }
      this.state.currentScore += payload.scoreDelta;
    } else {
      this.currentItem.decrementScore(Math.abs(payload.scoreDelta));

      // this.$store.dispatch('saveItem', this.currentItem);
      this.store.saveItem(this.currentItem);
    }

    if (this.state.currentScore >= this.maxScore) {
      this.finishSession();
    } else {
      this.continueSession();
    }
  }
}
