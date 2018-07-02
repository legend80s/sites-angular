import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatListModule } from "@angular/material";

import { SearchBoxComponent } from './search-box.component';

@NgModule({
  imports: [
    CommonModule,

    HttpClientJsonpModule,
    HttpClientModule,

    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
  ],
  exports: [
    SearchBoxComponent,
  ],
  declarations: [SearchBoxComponent]
})
export class SearchBoxModule { }
