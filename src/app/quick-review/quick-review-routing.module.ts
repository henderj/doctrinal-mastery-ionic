import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuickReviewPage } from './quick-review.page';

const routes: Routes = [
  {
    path: '',
    component: QuickReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuickReviewPageRoutingModule {}
