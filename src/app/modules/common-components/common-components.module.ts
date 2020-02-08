import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleProgressComponent } from 'src/app/components/circle-progress/circle-progress.component';



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
