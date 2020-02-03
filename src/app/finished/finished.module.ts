import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinishedPageRoutingModule } from './finished-routing.module';

import { FinishedPage } from './finished.page';
import { CircleProgressComponent } from '../circle-progress/circle-progress.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinishedPageRoutingModule
  ],
  declarations: [FinishedPage, CircleProgressComponent]
})
export class FinishedPageModule {}
