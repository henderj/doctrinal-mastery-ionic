import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() question = 'Question Placeholder';
  @Input() answer = 'Answer Placeholder';

  @Output() clicked = new EventEmitter();

  hideAnswer = true;

  ngOnInit(): void {
  }

  onClick(): void {
    this.hideAnswer = false;
    this.clicked.emit();
  }
}
