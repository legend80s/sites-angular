import { Component, Input } from '@angular/core';
import { SearchType, ISuggestion } from '../../../video-search-driver.service';
import { SuggestionService } from '../../suggestion.service';

@Component({
  selector: 'app-suggestion-item',
  templateUrl: './suggestion-item.component.html',
  styleUrls: ['./suggestion-item.component.scss']
})
export class SuggestionItemComponent {
  @Input() searchType: SearchType;
  @Input() suggestion: ISuggestion;

  SearchType = SearchType;

  constructor(private suggestionService: SuggestionService) { }

  setQuery(query: string) {
    this.suggestionService.setQuery(query);
  }

  toSearchPage(query: string) {
    this.suggestionService.toSearchPage(query);
  }
}
