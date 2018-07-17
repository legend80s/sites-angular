import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmusementParkComponent } from './amusement-park.component';
import { SurfingCenterComponent } from './surfing-center/surfing-center.component';
import { VideoCenterComponent } from './video-center/video-center.component';
import { TedCenterComponent } from './ted-center/ted-center.component';

import { MatTabsModule, MatPaginatorModule, MatDialogModule, MatButtonModule, MatIconModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { TedProfileComponent } from '../ted-profile/ted-profile.component';
import { TryToWatchDialogComponent } from '../try-to-watch-dialog/try-to-watch-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,

    MatTabsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],

  exports: [
    AmusementParkComponent,
  ],

  entryComponents: [
    TryToWatchDialogComponent,
  ],

  declarations: [
    AmusementParkComponent,
    SurfingCenterComponent,
    VideoCenterComponent,
    TedCenterComponent,
    TedProfileComponent,
    TryToWatchDialogComponent,
  ]
})
export class AmusementParkModule { }
