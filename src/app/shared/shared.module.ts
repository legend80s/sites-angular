import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FromComponent } from '../from/from.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    FromComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,

    FromComponent,
  ],
})
export class SharedModule {}
