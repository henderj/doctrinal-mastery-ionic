import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Choice, MCConfig } from '../../interfaces/mcconfig';

@Component({
  selector: 'app-mc-group',
  templateUrl: './mc-group.component.html',
  styleUrls: ['./mc-group.component.scss'],
})
export class MCGroupComponent implements OnInit {
  readonly stateColorMap: { [state: string]: string } = {
    normal: 'secondary',
    correct: 'success',
    incorrect: 'danger'
  };

  @Input() config: MCConfig = {
    choices: [
      { text: 'Choice A', state: 'normal', id: 0 },
      { text: 'Choice B', state: 'normal', id: 1 },
      { text: 'Choice C', state: 'normal', id: 2 },
      { text: 'Choice D', state: 'normal', id: 3 }
    ],
    correctIndex: 0
  };

  @Output() evaluatedAnswer = new EventEmitter<boolean>();

  choices: Choice[] = [];
  correctIndex = 0;
  anyChoiceClicked = false;

  constructor() { }

  ngOnInit() {
    this.choices = this.config.choices;
    this.correctIndex = this.config.correctIndex;

  }

  onChoiceClicked(index: number) {
    if (this.anyChoiceClicked) { return; }
    this.anyChoiceClicked = true;

    const correct: boolean = index === this.correctIndex;
    let incorrectChoice: Choice | null = null;
    const toRemove: number[] = [];

    for (let i = 0; i < this.choices.length; i++) {
      const choice = this.choices[i];
      if (i === this.correctIndex) {
        choice.state = 'correct';
      } else {
        if (i === index) {
          choice.state = 'incorrect';
          incorrectChoice = this.choices[i];
        } else {
          choice.state = 'hidden';
        }
      }
    }

    for (let i = toRemove.length - 1; i >= 0; i--) {
      this.choices.splice(toRemove[i], 1);
    }
    if (
      incorrectChoice != null &&
      this.choices.indexOf(incorrectChoice) === 0
    ) {
      this.choices.reverse();
    }

    this.evaluatedAnswer.emit(correct);
  }
}
