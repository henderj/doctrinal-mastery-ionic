import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/book';
import { Item } from 'src/app/item';
import { ChallengePayload } from '../ChallengePayload';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() book: Book;
  @Input() item: Item;

  @Output() finished = new EventEmitter<ChallengePayload>();

  cardClicked = false;

  get question(): string {
    if (this.item) { return this.item.question; }

    return 'Question placeholder.';
  }

  get answer(): string {
    if (this.item) { return this.item.answer; }

    return 'Answer placeholder.';
  }

  ngOnInit(): void {
  }

  onCardClick(): void {
    this.cardClicked = true;
  }

  onButtonClick(isMastered: boolean): void {
    const score: number = isMastered ? 3 : -2;
    this.finished.emit({correct: isMastered, scoreDelta: score});
  }
}
