import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleProgressComponent } from '../circle-progress/circle-progress.component';



@NgModule({
  declarations: [CircleProgressComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CircleProgressComponent
  ]
})
export class CommonComponentsModule { }
