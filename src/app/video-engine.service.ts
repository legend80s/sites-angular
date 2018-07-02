import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export enum SearchType {
  Hot, // 热搜
  Suggestion, // 根据用户输入反馈相应下拉提示
}

export enum Engines {
  Youku,
  Tencent,
};

export interface ISuggestion {
  id: string,
  value: string,
}

interface IHotSearchable {
  search(): Observable<ISuggestion[]>
}

interface ISuggestionSearchable {
  search(query: string): Observable<ISuggestion[]>
}

interface ISearchConfig {
  url: string,
  callbackParam: string,
  format(response: any): ISuggestion[],
}

interface ISuggestionConfig extends ISearchConfig {
  keyword: string,
}

interface IEngineConfig {
  id: Engines,
  hot: ISearchConfig,
  suggestion: ISuggestionConfig,
}

class MyHttpClient extends HttpClient {
  jsonp(url: string, callbackParam: string, params: object = {}) {
    return this.jsonp(MyHttpClient.buildUrl(url, params), callbackParam);
  }

  private static buildUrl(url: string, params: object): string {
    const querystring = MyHttpClient.buildParams(params);
    const prefix = url.includes('?') ? '&' : '?';

    return `${url}${prefix}${querystring}`;
  }

  private static buildParams(query: object): string {
    return Object.keys(query)
      .reduce((acc, key) => acc.concat(`${key}=${query[key]}`), [])
      .join('&');
  }
}

class HotEngine implements IHotSearchable {
  constructor(private http: MyHttpClient, private config: ISearchConfig) {}

  search() {
    return this.http.jsonp(`${this.config.url}`, this.config.callbackParam)
      .pipe(
        map(response => this.config.format(response))
      );;
  }
}

class SuggestionEngine implements ISuggestionSearchable {
  constructor(private http: MyHttpClient, private config: ISuggestionConfig) {
    this.config = config;
  }

  search(query: string) {
    const config = this.config;

    const prefix = config.url.includes('?') ? '&' : '?';
    const querystring = `${prefix}${config.keyword}=${query}`;

    return this.http.jsonp(`${config.url}${querystring}`, config.callbackParam)
      .pipe(
        map(response => config.format(response))
      );
  }
}

export class SearchDriver {
  private hotEngine: HotEngine
  private suggestionEngine: SuggestionEngine

  constructor(
    private http: MyHttpClient,
    private hotConfig: ISearchConfig,
    private suggestionConfig: ISuggestionConfig
  ) {
    this.hotEngine = new HotEngine(http, hotConfig);
    this.suggestionEngine = new SuggestionEngine(http, suggestionConfig);
  }

  /**
   * 热搜
   */
  getHottest() {
    return this.hotEngine.search();
  }

  /**
   * 下拉提示搜索
   */
  search(query: string) {
    return this.suggestionEngine.search(query);
  }
}

interface ITencentHotResult {
  words: [
    {
      c_title: string,
    }
  ]
}

interface ITencentSuggestionResult {
  item: [
    {
      word: string,
    }
  ]
}

const ENGINE_CONFIGS: IEngineConfig[] = [
  // 优酷
  {
    id: Engines.Youku,
    hot: {
      url: 'http://tip.soku.com/search_tip_1',
      callbackParam: 'jsoncallback',
      format: (response) => {
        console.log('response in format of hot:', response);

        return response.r.map(({ w }, index) => ({ id: index, value: w }));
      },
    },
    suggestion: {
      url: 'http://tip.soku.com/search_tip_1',
      callbackParam: 'jsoncallback',
      keyword: 'query',
      format: (response) => {
        console.log('response in format of suggesion:', response);

        return response.r.map(({ w }, index) => ({ id: index, value: w }));
      },
    }
  },

  // 腾讯视频
  {
    id: Engines.Tencent,
    hot: {
      url: 'https://data.video.qq.com/fcgi-bin/dataout?auto_id=938&otype=json',
      callbackParam: 'callback',
      format: (response) => {
        console.log('response in format of Tencent hot:', response);

        return (<ITencentHotResult>response).words.slice(0, 10).map(
          ({ c_title }, index) => ({ id: index, value: c_title })
        )
      },
    },
    suggestion: {
      url: 'https://s.video.qq.com/smartbox?callback=x&num=10&otype=json',
      callbackParam: 'callback',
      keyword: 'query',
      format: (response) => {
        console.log('response in format of Tencent suggesion:', response);
        const item = (<ITencentSuggestionResult>response).item;

        return !item ? [] : item.map(
          ({ word }, index) => ({ id: index, value: word })
        )
      },
    }
  },
];

/**
* 生成各大视频网站搜索引擎
* 单例
*/
@Injectable({
  providedIn: 'root'
})
export class VideoEngineService {
  private cache = {};
  private constructor(private http: HttpClient) {}

  /**
   * 获取相应的搜索引擎实例
   * lazy initiating
   * @param engineId 搜索引擎，比如 Youku
   */
  public getInstance(engineId: Engines): SearchDriver {
    if (this.cache[engineId]) {
      return this.cache[engineId];
    }

    const { hot, suggestion } = ENGINE_CONFIGS.find(({ id }) => id === engineId);

    this.cache[engineId] = new SearchDriver(this.http, hot, suggestion);

    return this.cache[engineId];
  }
}
