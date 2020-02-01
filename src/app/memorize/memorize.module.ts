import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemorizePageRoutingModule } from './memorize-routing.module';

import { MemorizePage } from './memorize.page';
import { MultipleChoiceComponent } from './multiple-choice/multiple-choice.component';
import { CardComponent } from './card/card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemorizePageRoutingModule
  ],
  declarations: [MemorizePage, MultipleChoiceComponent, CardComponent]
})
export class MemorizePageModule { }
