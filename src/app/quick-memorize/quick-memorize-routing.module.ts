import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuickMemorizePage } from './quick-memorize.page';

const routes: Routes = [
  {
    path: '',
    component: QuickMemorizePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuickMemorizePageRoutingModule {}
