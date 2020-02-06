import { Component, OnInit } from '@angular/core';
import { ChallengePayload } from './ChallengePayload';

@Component({
  selector: 'app-memorize',
  templateUrl: './memorize.page.html',
  styleUrls: ['./memorize.page.scss'],
})
export class MemorizePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onFinished(payload: ChallengePayload) {
    console.log('finished: ', payload);
  }

}
