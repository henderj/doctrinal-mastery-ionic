import { Component, OnInit } from '@angular/core';
import { ChallengePayload } from '../../interfaces/ChallengePayload';
import { Book } from '../../interfaces/book';
import { Item, ItemType } from '../../interfaces/item';

@Component({
  selector: 'app-memorize',
  templateUrl: './memorize.page.html',
  styleUrls: ['./memorize.page.scss'],
})
export class MemorizePage implements OnInit {

  useCardChallenge = false;

  readonly MaxCurrentItems = 4;

  currentBook: Book = new Book('test', [
    new Item(0, ItemType.Doctrine, 'test 1: reference(Q)', 'test 1: doctrine(A)'),
    new Item(1, ItemType.Reference, 'test 1: doctrine(Q)', 'test 1: reference(A)'),
    new Item(2, ItemType.Doctrine, 'test 2: reference(Q)', 'test 2: doctrine(A)'),
    new Item(3, ItemType.Reference, 'test 2: doctrine(Q)', 'test 2: reference(A)'),
    new Item(4, ItemType.Doctrine, 'test 3: reference(Q)', 'test 3: doctrine(A)'),
    new Item(5, ItemType.Reference, 'test 3: doctrine(Q)', 'test 3: reference(A)'),
    new Item(6, ItemType.Doctrine, 'test 4: reference(Q)', 'test 4: doctrine(A)'),
    new Item(7, ItemType.Reference, 'test 4: doctrine(Q)', 'test 4: reference(A)'),
  ]);
  currentView = '';
  currentViewCounter = 0;

  maxScore = 10;
  currentScore = 0;

  currentItems: Item[] = [];
  itemIndex = 0;

  masteredItems: Item[] = [];

  get book(): Book {
    return this.currentBook;
  }

  get currentProperties(): object {
    return {
      book: this.book,
      item: this.currentItems[this.itemIndex]
    };
  }

  get currentItem(): Item {
    return this.currentItems[this.itemIndex];
  }

  get progressPercent(): number {
    let percent: number = Math.abs((this.currentScore / this.maxScore) * 100);
    if (percent > 100) { percent = 100; }
    if (percent < 0) { percent = 0; }

    return percent;
  }

  created() {
    this.maxScore = this.calcMaxScore();
    this.setNextItem();
    this.setView();
  }

  private calcMaxScore(): number {
    if (this.currentBook.pointsLeft <= 0) { return 10; }

    if (this.currentBook.pointsLeft > 10) { return 10; }

    return this.currentBook.pointsLeft;
  }

  private setNextItem(): void {
    if (this.currentItems.length >= this.MaxCurrentItems) {
      this.itemIndex = Math.floor(Math.random() * this.currentItems.length);
      return;
    }

    let nextItem: Item;

    if (this.book.itemsNotSeen.length + this.book.itemsLearning.length > 0) {
      nextItem = this.book.chooseRandomSingle(
        this.book.itemsNotSeen.concat(this.book.itemsLearning)
      );

      const nextItemIndex = this.currentItems.indexOf(nextItem);
      if (nextItemIndex === -1) {
        this.currentItems.push(nextItem);
        this.itemIndex = this.currentItems.length - 1;
        return;
      }

      this.itemIndex = nextItemIndex;
      return;
    }

    nextItem = this.book.chooseRandomSingle(this.book.itemsMastered);
    this.currentItems.push(nextItem);
    this.itemIndex = this.currentItems.length - 1;

  }

  private setView(): void {
    this.currentViewCounter++;
    if (this.currentItem.score >= 2) {
      this.currentView = 'CardChallenge';
      this.useCardChallenge = true;
      return;
    }
    this.currentView = 'MultipleChoiceChallenge';
    this.useCardChallenge = false;
  }

  private finishSession(): void {
    // this.$store.commit('updateMasteredItems', {
    //   masteredItems: this.masteredItems
    // });
    // this.$router.push({
    //   name: 'finished'
    // });
  }

  private removeItemFromArray(item: Item, array: Item[]): void {
    const index = array.indexOf(item);
    if (index !== -1) { array.splice(index, 1); }
  }

  // onFinishedQuestion(correct: boolean, scoreDelta: number): void {
  //   if (correct) {
  //     this.currentItem.incrementScore(scoreDelta);
  //     // this.$store.dispatch('saveItem', this.currentItem);
  //     if (this.currentItem.mastered) {
  //       this.masteredItems.push(this.currentItem);
  //       this.removeItemFromArray(this.currentItem, this.currentItems);
  //     }
  //     this.currentScore += scoreDelta;
  //   } else {
  //     this.currentItem.decrementScore(Math.abs(scoreDelta));
  //     // this.$store.dispatch('saveItem', this.currentItem);
  //   }

  //   if (this.currentScore >= this.maxScore) {
  //     this.finishSession();
  //   } else {
  //     this.setNextItem();
  //     this.setView();
  //   }
  // }

  constructor() { }

  ngOnInit() {
    this.maxScore = this.calcMaxScore();
    this.setNextItem();
    this.setView();
  }

  onFinished(payload: ChallengePayload) {
    console.log('finished: ', payload);
    if (payload.correct) {
      this.currentItem.incrementScore(payload.scoreDelta);
      // this.$store.dispatch('saveItem', this.currentItem);
      if (this.currentItem.mastered) {
        this.masteredItems.push(this.currentItem);
        this.removeItemFromArray(this.currentItem, this.currentItems);
      }
      this.currentScore += payload.scoreDelta;
    } else {
      this.currentItem.decrementScore(Math.abs(payload.scoreDelta));
      // this.$store.dispatch('saveItem', this.currentItem);
    }

    if (this.currentScore >= this.maxScore) {
      this.finishSession();
    } else {
      this.setNextItem();
      this.setView();
    }
  }

}
