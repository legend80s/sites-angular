import { Component, Input } from '@angular/core';
import { SearchType, ISuggestion } from '../../video-engine.service';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.scss']
})
export class SuggestionListComponent {
  @Input() searchType: SearchType;
  @Input() suggestions: ISuggestion[];

  SearchType = SearchType;
}
