import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { IonSlides, IonLabel, IonProgressBar } from '@ionic/angular';

import { ChallengePayload } from 'src/app/interfaces/ChallengePayload';
import { Book } from 'src/app/interfaces/book';
import { Item, ItemType } from 'src/app/interfaces/item';
import { MemorizeService } from 'src/app/services/memorize.service';
import { MemorizeChallenges } from 'src/app/enums/memorize-challenges.enum';
import { NextItemPayload } from 'src/app/interfaces/NextItemPayload';
import { ChallengeSlideData } from 'src/app/interfaces/ChallengeSlideData';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-memorize',
  templateUrl: './memorize.page.html',
  styleUrls: ['./memorize.page.scss'],
})
export class MemorizePage {

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

  item: Item;

  @ViewChild(IonSlides, { static: false }) slider: IonSlides;
  slideOptions = { allowTouchMove: false };
  slides: ChallengeSlideData[] = [];

  subscriptions: Subscription[] = [];

  get currentProperties(): object {
    return {
      book: this.book,
      item: this.item
    };
  }

  get progressPercent(): number {
    return this.memorizeService.progressPercent;
  }


  constructor(public memorizeService: MemorizeService) {
  }

  ionViewWillEnter() {
    const sliderSub = this.slider.ionSlideTransitionEnd.subscribe(() => this.clipSlides());
    this.subscriptions.push(sliderSub);

    const nextItemSub = this.memorizeService.onNextItem$.subscribe({ next: payload => this.onNextItemReady(payload) });
    this.subscriptions.push(nextItemSub);

    this.memorizeService.startNewSession(this.book);
  }

  ionViewWillLeave() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }

  onNextItemReady(payload: NextItemPayload) {
    const useCard = payload.view === MemorizeChallenges.Card;
    this.slides.push({ useCardChallenge: useCard, book: this.book, item: payload.item });

    this.slider.update()
      .then(() => this.slideToNext());
  }

  private slideToNext() {
    this.slider.slideTo(this.slides.length - 1);
  }

  private clipSlides() {
    if (this.slides.length > 2) {
      //   this.slides.splice(0, 1);
    }
  }

  onFinished(payload: ChallengePayload) {
    this.memorizeService.onFinished(payload);
  }

}
