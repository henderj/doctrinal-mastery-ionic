import { Component, OnInit } from '@angular/core';
import { ChallengePayload } from '../../interfaces/ChallengePayload';
import { Book } from '../../interfaces/book';
import { Item, ItemType } from '../../interfaces/item';
import { MemorizeService } from 'src/app/services/memorize.service';
import { MemorizeChallenges } from 'src/app/enums/memorize-challenges.enum';

@Component({
  selector: 'app-memorize',
  templateUrl: './memorize.page.html',
  styleUrls: ['./memorize.page.scss'],
})
export class MemorizePage implements OnInit {

  useCardChallenge = false;

  book: Book = new Book('test', [
    new Item(0, ItemType.Doctrine, 'test 1: reference(Q)', 'test 1: doctrine(A)'),
    new Item(1, ItemType.Reference, 'test 1: doctrine(Q)', 'test 1: reference(A)'),
    new Item(2, ItemType.Doctrine, 'test 2: reference(Q)', 'test 2: doctrine(A)'),
    new Item(3, ItemType.Reference, 'test 2: doctrine(Q)', 'test 2: reference(A)'),
    new Item(4, ItemType.Doctrine, 'test 3: reference(Q)', 'test 3: doctrine(A)'),
    new Item(5, ItemType.Reference, 'test 3: doctrine(Q)', 'test 3: reference(A)'),
    new Item(6, ItemType.Doctrine, 'test 4: reference(Q)', 'test 4: doctrine(A)'),
    new Item(7, ItemType.Reference, 'test 4: doctrine(Q)', 'test 4: reference(A)'),
  ]);

  currentItem: Item;

  get currentProperties(): object {
    return {
      book: this.book,
      item: this.currentItem
    };
  }


  get progressPercent(): number {
    return this.memorizeService.progressPercent;
  }


  private updateView(view: MemorizeChallenges): void {
    if (view === MemorizeChallenges.Card) {
      this.useCardChallenge = true;
      return;
    }

    this.useCardChallenge = false;
  }


  constructor(public memorizeService: MemorizeService) { }

  ngOnInit() {
    this.memorizeService.startMemorizeSession(this.book, this.onNextItemReady);
  }

  onNextItemReady(item: Item, view: MemorizeChallenges) {
    this.updateView(view);
    this.currentItem = item;
  }

  onFinished(payload: ChallengePayload) {
    console.log('finished: ', payload);

    this.memorizeService.onFinished(payload);
  }

}
