import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { IonSlides, IonLabel } from '@ionic/angular';

import { ChallengePayload } from 'src/app/interfaces/ChallengePayload';
import { Book } from 'src/app/interfaces/book';
import { Item, ItemType } from 'src/app/interfaces/item';
import { MemorizeService } from 'src/app/services/memorize.service';
import { MemorizeChallenges } from 'src/app/enums/memorize-challenges.enum';
import { NextItemPayload } from 'src/app/interfaces/NextItemPayload';
import { ChallengeSlideData } from 'src/app/interfaces/ChallengeSlideData';

@Component({
  selector: 'app-memorize',
  templateUrl: './memorize.page.html',
  styleUrls: ['./memorize.page.scss'],
})
export class MemorizePage implements OnInit, AfterViewInit {

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
  @ViewChildren('ion-slides') sliderChildren: QueryList<IonSlides>;
  slideOptions = { allowTouchMove: false };
  slides: ChallengeSlideData[] = [];

  get currentProperties(): object {
    return {
      book: this.book,
      item: this.item
    };
  }

  get progressPercent(): number {
    return this.memorizeService.progressPercent;
  }


  constructor(public memorizeService: MemorizeService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.slider.ionSlideTransitionEnd.subscribe(() => this.clipSlides());

    this.memorizeService.onNextItem$.subscribe(payload => {
      this.onNextItemReady(payload);
    });
    this.memorizeService.startMemorizeSession(this.book);
  }

  onNextItemReady(payload: NextItemPayload) {
    // this.updateView(payload.view);
    // this.item = payload.item;

    const useCard = payload.view === MemorizeChallenges.Card;
    this.slides.push({ useCardChallenge: useCard, book: this.book, item: payload.item });
    // this.clipSlides();

    // this.slider.lockSwipes(false);
    this.slider.update()
      .then(() => this.slideToNext());
    // .then(() => this.clipSlides);
    // this.slider.lockSwipes(true);
  }

  private slideToNext() {
    console.log('sliding');
    this.slider.slideTo(this.slides.length - 1);
  }

  private clipSlides() {
    if (this.slides.length > 2) {
      this.slides.splice(0, 1);
    }
  }

  onFinished(payload: ChallengePayload) {
    this.memorizeService.onFinished(payload);
  }

}
