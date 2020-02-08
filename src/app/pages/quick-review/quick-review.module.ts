import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuickReviewPageRoutingModule } from './quick-review-routing.module';

import { QuickReviewPage } from './quick-review.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuickReviewPageRoutingModule
  ],
  declarations: [QuickReviewPage]
})
export class QuickReviewPageModule {}
