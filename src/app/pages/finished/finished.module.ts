import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinishedPageRoutingModule } from './finished-routing.module';

import { FinishedPage } from './finished.page';
import { CircleProgressComponent } from '../../components/circle-progress/circle-progress.component';
import { CommonComponentsModule } from '../../modules/common-components/common-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinishedPageRoutingModule,
    CommonComponentsModule
  ],
  declarations: [FinishedPage]
})
export class FinishedPageModule {}
