import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuickMemorizePageRoutingModule } from './quick-memorize-routing.module';

import { QuickMemorizePage } from './quick-memorize.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuickMemorizePageRoutingModule
  ],
  declarations: [QuickMemorizePage]
})
export class QuickMemorizePageModule {}
