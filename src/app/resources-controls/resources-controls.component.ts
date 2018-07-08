import { Component, OnInit, Input } from '@angular/core';

export interface IPagination {
  total: number,
  pageSize: number,
  page(pageIndex: number): void,
}

export interface IFrom {
  text: string,
  url: string,
}

@Component({
  selector: 'app-resources-controls',
  templateUrl: './resources-controls.component.html',
  styleUrls: ['./resources-controls.component.scss']
})
export class ResourcesControlsComponent implements OnInit {
  @Input() pagination: IPagination;
  @Input() from: IFrom;

  constructor() { }

  ngOnInit() {
  }

}
