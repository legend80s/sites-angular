import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SuggestionService {
  private querySource = new BehaviorSubject<string>('');
  private toSearchPageQuerySource = new BehaviorSubject<string>('');

  // to be subscribed
  query$: Observable<string> = this.querySource.asObservable();
  toSearchPageQuery$: Observable<string> = this.toSearchPageQuerySource.asObservable();

  constructor() { }

  setQuery(query: string) {
    this.querySource.next(query);
  }

  toSearchPage(query: string) {
    this.toSearchPageQuerySource.next(query);
  }
}
