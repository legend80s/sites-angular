import { Component, OnInit } from '@angular/core';
import { debounce } from "lodash";
import { Engines, VideoEngineService, SearchDriver, SearchType, ISuggestion } from '../video-engine.service';

const SEARCH_PAGE_CONFIG = {
  [Engines.Youku]: {
    url: 'http://so.youku.com/search_video/q_'
  },
  [Engines.Tencent]: {
    url: 'https://v.qq.com/x/search/?q='
  }
}

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  private static DEFAULT_ENGINE = Engines.Youku

  public query = ''
  public Engines = Engines
  public currentEngine = SearchBoxComponent.DEFAULT_ENGINE;

  public suggestions: ISuggestion[] = [];
  private hots: ISuggestion[];
  private driver: SearchDriver;

  public SearchType = SearchType
  public searchType = SearchType.Hot // 默认显示热搜
  public search: Function;

  constructor(private videoEngineService: VideoEngineService) {
    this.driver = this.videoEngineService.getInstance(this.currentEngine);
    this.search = debounce(this.undebouncedSearch, 500);
  }

  /**
   * 默认显示热搜
   */
  ngOnInit() {
    this.showHottest();
  }

  public setQuery(query) {
    if (this.query !== query) {
      this.query = query;
      this.showSuggestions(query)
    }
  }

  public toSearchPage(query: string) {
    const newWindow = window.open(SEARCH_PAGE_CONFIG[this.currentEngine].url + query);

    newWindow.opener = null;
  }

  public changeEngine(): void {
    console.log('this.currentEngine:', this.currentEngine);
    this.driver = this.videoEngineService.getInstance(this.currentEngine);

    if (this.query) {
      this.showSuggestions(this.query)
    } else {
      this.fetchHottest();
    }
  }

  private undebouncedSearch(query: string): void {
    this.query = query;

    if (!query) {
      this.showHottest();
    } else {
      this.showSuggestions(query);
    }
  }

  /**
   * 显示热搜
   * 带缓存
   */
  private showHottest(): void {
    this.searchType = SearchType.Hot;

    if (this.hots) {
      this.suggestions = this.hots;
    } else {
     this.fetchHottest();
    }
  }

  private fetchHottest(): void {
    this.driver.getHottest().subscribe(data => {
      this.suggestions = this.hots = data;
    });
  }

  /**
   * 显示下拉提示
   * @param query 查询词
   */
  private showSuggestions(query: string): void {
    this.searchType = SearchType.Suggestion;

    this.driver.search(query).subscribe(data => {
      this.suggestions = data;
    });
  }
}
