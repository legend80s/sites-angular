import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmusementParkComponent } from './amusement-park.component';
import { SurfingCenterComponent } from './surfing-center/surfing-center.component';
import { VideoCenterComponent } from './video-center/video-center.component';
import { NewsCenterComponent } from './news-center/news-center.component';

import { MatTabsModule, MatPaginatorModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,

    MatTabsModule,
    MatPaginatorModule,
  ],
  exports: [
    AmusementParkComponent,
  ],
  declarations: [
    AmusementParkComponent,
    SurfingCenterComponent,
    VideoCenterComponent,
    NewsCenterComponent,
  ]
})
export class AmusementParkModule { }
