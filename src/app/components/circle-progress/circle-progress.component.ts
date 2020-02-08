import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-circle-progress',
  templateUrl: './circle-progress.component.html',
  styleUrls: ['./circle-progress.component.scss'],
})
export class CircleProgressComponent implements OnInit {
  @Input() progress = 0;

  @Input() stroke = 4;

  @Input() radius = 70;

  get formattedProgress(): string {
    return Math.floor(this.progress * 100) + '%';
  }

  get normalizedRadius(): number {
    return this.radius - this.stroke * 2;
  }

  get circumference(): number {
    return this.normalizedRadius * 2 * Math.PI;
  }

  get strokeDashoffset(): number {
    return this.circumference - (this.progress) * this.circumference;
  }

  constructor() { }

  ngOnInit() { }

}
