import { Component, OnInit, Input } from '@angular/core';
import { ITed } from 'src/app/amusement-park/ted-center/ted-center.component';

@Component({
  selector: 'app-ted-profile',
  templateUrl: './ted-profile.component.html',
  styleUrls: ['./ted-profile.component.scss']
})
export class TedProfileComponent implements OnInit {
  @Input() ted: ITed;

  constructor() { }

  ngOnInit() {
  }

}
