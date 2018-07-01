import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmusementParkComponent } from './amusement-park.component';
import { SurfingCenterComponent } from './surfing-center/surfing-center.component';
import { VideoCenterComponent } from './video-center/video-center.component';
import { NewsCenterComponent } from './news-center/news-center.component';

import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
  ],
  exports: [
    AmusementParkComponent,
  ],
  declarations: [AmusementParkComponent, SurfingCenterComponent, VideoCenterComponent, NewsCenterComponent]
})
export class AmusementParkModule { }
