import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-from',
  templateUrl: './from.component.html',
  styleUrls: ['./from.component.scss']
})
export class FromComponent implements OnInit {
  @Input() text: string;
  @Input() url: string;
  constructor() { }

  ngOnInit() {
  }

}
