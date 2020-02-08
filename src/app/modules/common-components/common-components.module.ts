import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleProgressComponent } from '../../components/circle-progress/circle-progress.component';



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
