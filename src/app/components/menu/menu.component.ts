import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MenuController, IonRadioGroup } from '@ionic/angular';
import { Book } from 'src/app/interfaces/book';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, AfterViewInit {

  @ViewChild('bookRadioGroup', { static: false }) radioGroup!: IonRadioGroup;

  currentBookIndex: number;

  readonly bookOptions: string[] = [
    'OT',
    'NT',
    'BM',
    'DC'
  ];

  constructor(private store: StoreService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.currentBookIndex = this.store.state.currentBookIndex;
    this.radioGroup.value = this.bookOptions[this.currentBookIndex];
    this.radioGroup.ionChange.subscribe(() => this.radioChanged());
  }

  ionViewWillEnter() {
  }

  radioChanged() {
    const newIndex = this.bookOptions.indexOf(this.radioGroup.value);
    this.updateValue(newIndex);
  }

  updateValue(value: number): void {
    console.log('updating value to ', value);
    this.currentBookIndex = value;
    this.store.currentBookIndex = value;
  }

}
