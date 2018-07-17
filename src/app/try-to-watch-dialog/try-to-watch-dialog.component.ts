import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ITed } from 'src/app/amusement-park/ted-center/ted-center.component';

@Component({
  selector: 'app-try-to-watch-dialog',
  templateUrl: './try-to-watch-dialog.component.html',
  styleUrls: ['./try-to-watch-dialog.component.scss']
})
export class TryToWatchDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<TryToWatchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITed
  ) {}

  ngOnInit() {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ok(): void {
    window.open(this.data.url, '_blank');
    this.dialogRef.close();
  }
}
