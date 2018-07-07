import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { debounce } from "lodash";
import { Engines, VideoSearchDriverService, SearchDriver, SearchType, ISuggestion } from '../video-search-driver.service';
import { SuggestionService } from './suggestion.service';
import { Subscription } from 'rxjs';

const SEARCH_PAGE_CONFIG = {
  [Engines.Youku]: {
    url: 'http://so.youku.com/search_video/q_'
  },
  [Engines.Tencent]: {
    url: 'https://v.qq.com/x/search/?q='
  },
  [Engines.Baidu]: {
    url: 'https://www.baidu.com/s?ie=UTF-8&wd='
  },
  [Engines.Google]: {
    url: 'https://www.google.com.hk/search?q='
  }
}

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  EngineMap = [
    {
      id: Engines.Baidu,
      value: '百度',
    },
    {
      id: Engines.Google,
      value: '谷歌',
    },
    {
      id: Engines.Youku,
      value: '优酷',
    },
    {
      id: Engines.Tencent,
      value: '腾讯视频',
    },
  ];

  query = ''
  Engines = Engines
  currentEngine = this.EngineMap[0].id;

  suggestions: ISuggestion[] = [];

  // cache 各引擎的热搜
  private hottestCache: {
    [propKey: string]: ISuggestion[]
  } = {};

  private driver: SearchDriver;

  SearchType = SearchType
  searchType = SearchType.Hot // 默认显示热搜
  search: Function;

  querySubscription: Subscription;
  toSearchPageQuerySubscription: Subscription;

  private searchBoxElement: HTMLElement;

  constructor(
    private videoSearchDriverService: VideoSearchDriverService,
    private suggestionService: SuggestionService,
    private elementRef: ElementRef
  ) {
    this.driver = this.videoSearchDriverService.getInstance(this.currentEngine);
    this.search = debounce(this.undebouncedSearch, 500);

    this.querySubscription = suggestionService.query$.subscribe(
      (query: string) => this.setQuery(query)
    );
    this.toSearchPageQuerySubscription = suggestionService.toSearchPageQuery$.subscribe(
      (query: string) => this.toSearchPage(query)
    );
  }

  @HostListener('document:click', ['$event'])
  closeSuggestionList($event: MouseEvent) {
    const targetElement = $event.target as HTMLElement;

    if (!this.searchBoxElement.contains(targetElement)) {
      console.log('click outside of the component');
      this.searchBoxElement.classList.add('hide-suggestion-list');
    }
  }

  @HostListener('click')
  openSuggestionList() {
    console.log('click in the component');
    this.searchBoxElement.classList.remove('hide-suggestion-list');
  }

  /**
   * 默认显示热搜
   */
  ngOnInit() {
    // 默认不显示下拉提示
    this.searchBoxElement = (this.elementRef.nativeElement as HTMLElement).querySelector('.search-box');
    this.searchBoxElement.classList.add('hide-suggestion-list');

    this.showHottest();
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
    this.toSearchPageQuerySubscription.unsubscribe();
  }

  private setQuery(query) {
    if (this.query !== query) {
      this.query = query;
      this.showSuggestions(query)
    }
  }

  private toSearchPage(query: string) {
    // 因为 BehaviorService 默认会 emit 初始值
    // 防止刷新页面自动跳转到空 query 的搜索页面
    if (!query) {
      return;
    }

    const newWindow = window.open(SEARCH_PAGE_CONFIG[this.currentEngine].url + query);

    newWindow.opener = null;
  }

  public changeEngine(): void {
    console.log('this.currentEngine:', this.currentEngine);
    this.driver = this.videoSearchDriverService.getInstance(this.currentEngine);

    if (this.query) {
      this.showSuggestions(this.query)
    } else {
      this.showHottest();
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
    const cache = this.hottestCache[this.currentEngine];

    if (cache) {
      console.log(`got ${Engines[this.currentEngine]}'s hottest from cache`, cache);

      this.suggestions = cache;
    } else {
      console.log(`got nothing from ${Engines[this.currentEngine]}'s hottest cache, try to fetch it through network`);
      this.fetchHottest();
    }
  }

  private fetchHottest(): void {
    this.driver.getHottest().subscribe(data => {
      // console.log('data in getHottest subscribe', data);

      this.suggestions = this.hottestCache[this.currentEngine] = data;
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
