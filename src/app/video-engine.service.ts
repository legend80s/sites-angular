import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';

export enum SearchType {
  Hot, // 热搜
  Suggestion, // 根据用户输入反馈相应下拉提示
}

interface SearchConfig {
  url: string,
  callbackParam: string,
  format(response: any): string[],
}

interface SuggestionSearchConfig extends SearchConfig {
  keyword: string,
}

interface EngineConfig {
  id: Engines,
  [SearchType.Hot]: SearchConfig,
  [SearchType.Suggestion]: SuggestionSearchConfig,
}

export enum Engines {
  Youku,
};

/**
* 生成各大视频网站搜索引擎
* 单例
*/
@Injectable({
  providedIn: 'root'
})
export class VideoEngineService {
 static engines: EngineConfig[] = [
   {
     id: Engines.Youku,
     [SearchType.Hot]: {
       url: 'http://tip.soku.com/search_tip_1',
       callbackParam: 'jsoncallback',
       format: (response) => {
         console.log('response in format of hot:', response);

         return response.r.map(({ w }) => w);
       },
     },
     [SearchType.Suggestion]: {
       url: 'http://tip.soku.com/search_tip_1',
       callbackParam: 'jsoncallback',
       keyword: 'query',
       format: (response) => {
         console.log('response in format of suggesion:', response);

         return response.r.map(({ w }) => w);
       },
     }
   }
 ];

 searchConfig: SearchConfig

 private constructor(private http: HttpClient) {}

 public getInstance(searchType: SearchType, engine: Engines): VideoEngineService {
   this.searchConfig = VideoEngineService.engines.find(({ id }) => id === engine)[searchType];

   return this;
 }

 public search(query?: string): Observable<string[]> {
  const searchConfig = <SuggestionSearchConfig>this.searchConfig;
  const querystring = query ? (this.searchConfig.url.includes('?') ? '&' : '?' + `${searchConfig.keyword}=${query}`) : '';

  return this.http.jsonp(`${this.searchConfig.url}${querystring}`, this.searchConfig.callbackParam)
    .pipe(
      map(response => this.searchConfig.format(response))
    );
 }
}
