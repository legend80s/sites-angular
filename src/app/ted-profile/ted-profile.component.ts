import { Component, OnInit, Input } from '@angular/core';
import { ITed } from 'src/app/amusement-park/ted-center/ted-center.component';
import { MatDialog } from '@angular/material';
import { TryToWatchDialogComponent } from 'src/app/try-to-watch-dialog/try-to-watch-dialog.component';

@Component({
  selector: 'app-ted-profile',
  templateUrl: './ted-profile.component.html',
  styleUrls: ['./ted-profile.component.scss']
})
export class TedProfileComponent implements OnInit {
  @Input() ted: ITed;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  tryToWatch(): void {
    this.dialog.open(TryToWatchDialogComponent, {
      width: '600px',
      data: this.ted,
    });
  }
}
