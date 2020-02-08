import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Item, ItemType } from '../interfaces/item';
import { removeItemFromArray } from '../utils';
import { Book } from '../interfaces/book';
import { ChallengePayload } from '../interfaces/ChallengePayload';
import { MemorizeChallenges } from '../enums/memorize-challenges.enum';
import { NextItemPayload } from '../interfaces/NextItemPayload';

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
      item: this.currentItems[this.currentItemIndex]
    };
  }

  get currentItem(): Item {
    return this.currentItems[this.currentItemIndex];
  }

  get progressPercent(): number {
    let percent: number = Math.abs((this.currentScore / this.maxScore) * 100);
    if (percent > 100) { percent = 100; }
    if (percent < 0) { percent = 0; }

    return percent;
  }

  constructor() { }
  readonly MaxCurrentItems = 4;

  currentBook: Book = new Book('test', [
    new Item(900, ItemType.Doctrine, 'test 1: reference(Q)', 'test 1: doctrine(A)'),
    new Item(901, ItemType.Reference, 'test 1: doctrine(Q)', 'test 1: reference(A)'),
    new Item(902, ItemType.Doctrine, 'test 2: reference(Q)', 'test 2: doctrine(A)'),
    new Item(903, ItemType.Reference, 'test 2: doctrine(Q)', 'test 2: reference(A)'),
    new Item(904, ItemType.Doctrine, 'test 3: reference(Q)', 'test 3: doctrine(A)'),
    new Item(905, ItemType.Reference, 'test 3: doctrine(Q)', 'test 3: reference(A)'),
    new Item(906, ItemType.Doctrine, 'test 4: reference(Q)', 'test 4: doctrine(A)'),
    new Item(907, ItemType.Reference, 'test 4: doctrine(Q)', 'test 4: reference(A)'),
  ]);


  maxScore = 10;
  currentScore = 0;

  currentItems: Item[] = [];
  currentItemIndex = 0;

  masteredItems: Item[] = [];

  private onNextItemSource = new Subject<NextItemPayload>();
  onNextItem$ = this.onNextItemSource.asObservable();


  private static calcMaxScore(book: Book): number {
    if (book.pointsLeft <= 0) { return 10; }

    if (book.pointsLeft > 10) { return 10; }

    return book.pointsLeft;
  }

  public startMemorizeSession(book: Book): void {
    this.currentBook = book;
    this.maxScore = MemorizeService.calcMaxScore(book);

    this.continueSession();
  }

  private nextView(item: Item): MemorizeChallenges {
    if (item.score >= Item.MaxScore - 1) {
      return MemorizeChallenges.Card;
    }

    return MemorizeChallenges.MultipleChoice;
  }

  private getNextItemIndex(): number {
    const nextItem = this.getNextItem();
    const nextItemIndex = this.currentItems.indexOf(nextItem);

    if (nextItemIndex === -1) {
      this.currentItems.push(nextItem);
      return this.currentItems.length - 1;
    }

    return nextItemIndex;
  }

  private getNextItem(): Item {
    if (this.currentItems.length >= this.MaxCurrentItems) {
      return this.currentItems[Math.floor(Math.random() * this.currentItems.length)];
    }

    let nextItem: Item;

    if (this.book.itemsNotSeen.length + this.book.itemsLearning.length > 0) {
      nextItem = this.book.chooseRandomSingle(
        this.book.itemsNotSeen.concat(this.book.itemsLearning)
      );

      return nextItem;

      // const nextItemIndex = this.currentItems.indexOf(nextItem);
      // if (nextItemIndex === -1) {
      //   this.currentItems.push(nextItem);
      //   this.currentItemIndex = this.currentItems.length - 1;
      //   return;
      // }

      // this.currentItemIndex = nextItemIndex;
      // return;
    }

    nextItem = this.book.chooseRandomSingle(this.book.itemsMastered);
    return nextItem;
    // this.currentItems.push(nextItem);
    // this.currentItemIndex = this.currentItems.length - 1;

  }

  private continueSession(): void {
    this.currentItemIndex = this.getNextItemIndex();
    const nextView = this.nextView(this.currentItem);

    // this.nextItemCallback(this.currentItem, nextView);
    this.onNextItemSource.next({ item: this.currentItem, view: nextView });
  }

  private finishSession(): void {
    // this.$store.commit('updateMasteredItems', {
    //   masteredItems: this.masteredItems
    // });
    // this.$router.push({
    //   name: 'finished'
    // });
  }

  onFinished(payload: ChallengePayload) {
    console.log('finished: ', payload);

    if (payload.correct) {
      this.currentItem.incrementScore(payload.scoreDelta);
      // this.$store.dispatch('saveItem', this.currentItem);
      if (this.currentItem.mastered) {
        this.masteredItems.push(this.currentItem);
        removeItemFromArray(this.currentItem, this.currentItems);
      }
      this.currentScore += payload.scoreDelta;
    } else {
      this.currentItem.decrementScore(Math.abs(payload.scoreDelta));
      // this.$store.dispatch('saveItem', this.currentItem);
    }

    if (this.currentScore >= this.maxScore) {
      this.finishSession();
    } else {
      this.continueSession();
    }
  }
}
