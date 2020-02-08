import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemorizePageRoutingModule } from './memorize-routing.module';

import { MemorizePage } from './memorize.page';
import { MultipleChoiceComponent } from '../../components/multiple-choice/multiple-choice.component';
import { CardComponent } from '../../components/card/card.component';
import { MCGroupComponent } from '../../components/mc-group/mc-group.component';
import { MemorizeService } from '../../services/memorize.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemorizePageRoutingModule
  ],
  declarations: [MemorizePage, MultipleChoiceComponent, CardComponent, MCGroupComponent]
})
export class MemorizePageModule { }
