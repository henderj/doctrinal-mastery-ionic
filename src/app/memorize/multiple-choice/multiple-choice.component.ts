import { Component, OnInit, Input } from '@angular/core';
import { MCConfig, Choice } from './mcconfig';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss'],
})
export class MultipleChoiceComponent implements OnInit {
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

  choices: Choice[] = [...this.config.choices];
  anyChoiceClicked = false;

  constructor() { }

  ngOnInit() { }

  onChoiceClicked(index: number) {
    if (this.anyChoiceClicked) { return; }
    // let correct: boolean = index === this.config.correctIndex;
    let incorrectChoice: Choice | null = null;
    const toRemove: number[] = [];

    for (let i = 0; i < this.choices.length; i++) {
      const choice = this.choices[i];
      if (i === this.config.correctIndex) {
        choice.state = 'correct';
      } else {
        if (i === index) {
          choice.state = 'incorrect';
          incorrectChoice = this.choices[i];
        } else {
          // toRemove.push(i);
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

    this.anyChoiceClicked = true;
    // this.$emit("onEvaluatedAnswer", correct);
  }

}
