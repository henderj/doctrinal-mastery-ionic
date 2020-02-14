import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { MCConfig, Choice } from '../../interfaces/mcconfig';
import { Book } from 'src/app/interfaces/book';
import { Item } from 'src/app/interfaces/item';
import { ChallengePayload } from '../../interfaces/ChallengePayload';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss'],
})
export class MultipleChoiceComponent implements OnInit {
  @Input() book: Book;
  @Input() item: Item;

  @Output() finished = new EventEmitter<ChallengePayload>();

  questionAnswered = false;
  questionCorrect = false;
  isMobile = false;

  get config(): MCConfig {
    const choices: Choice[] = [];
    const otherItems: Item[] = this.book.getRandomChoices(this.item);
    const numChoices: number = otherItems.length + 1;

    const correctIndex: number = Math.floor(Math.random() * numChoices);

    for (let i = 0; i < numChoices; i++) {
      if (i === correctIndex) {
        choices.push({
          text: this.item.answer,
          state: 'normal',
          id: i
        });
      } else {
        const otherItem: Item = otherItems.splice(0, 1)[0];
        choices.push({
          text: otherItem.answer,
          state: 'normal',
          id: i
        });
      }
    }

    const config: MCConfig = { choices, correctIndex };
    return config;
  }

  get platformTap(): string {
    return this.isMobile ? 'Tap' : 'Click';
  }

  constructor(public platform: Platform) {
    this.isMobile = platform.is('mobile');
  }

  ngOnInit() { }

  onEvaluatedAnswer(correct: boolean) {
    this.questionCorrect = correct;
    this.questionAnswered = true;
  }

  onOverlayClicked() {
    const score: number = this.questionCorrect ? 1 : -1;
    this.finished.emit({ correct: this.questionCorrect, scoreDelta: score });
  }


}
