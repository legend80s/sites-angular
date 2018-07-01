import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Engines, SearchType, VideoEngineService } from '../video-engine.service';


@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  query = ''
  Engines = Engines
  engine = Engines.Youku

  private suggestions: Observable<string[]>;

  constructor(private videoEngineService: VideoEngineService) {}

  /**
   * 显示热搜
   */
  ngOnInit() {
    this.suggestions = this.videoEngineService.getInstance(SearchType.Hot, this.engine);
  }

  search(value) {
    this.query = value;

    this.suggestions = this.videoEngineService.getInstance(SearchType.Suggestion, this.engine, this.query);
  }
}
