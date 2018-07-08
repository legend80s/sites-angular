import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FromComponent } from '../from/from.component';
import { ResourcesControlsComponent } from '../resources-controls/resources-controls.component';
import { MatPaginatorModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatPaginatorModule,
  ],
  declarations: [
    FromComponent,
    ResourcesControlsComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,

    FromComponent,
    ResourcesControlsComponent,
  ],
})
export class SharedModule {}
