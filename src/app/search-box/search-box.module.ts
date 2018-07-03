import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatListModule, MatIconModule } from "@angular/material";

import { SearchBoxComponent } from './search-box.component';
import { SuggestionListComponent } from './suggestion-list/suggestion-list.component';
import { SuggestionItemComponent } from './suggestion-list/suggestion-item/suggestion-item.component';
import { SuggestionService } from './suggestion.service';

@NgModule({
  imports: [
    CommonModule,

    HttpClientJsonpModule,
    HttpClientModule,

    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
  ],
  exports: [
    SearchBoxComponent,
  ],
  providers: [
    SuggestionService,
  ],
  declarations: [SearchBoxComponent, SuggestionListComponent, SuggestionItemComponent]
})
export class SearchBoxModule { }
