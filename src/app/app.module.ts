import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorIntl } from '@angular/material';

import { SearchBoxModule } from "./search-box/search-box.module";
import { AmusementParkModule } from "./amusement-park/amusement-park.module";

import { AppComponent } from './app.component';

class MatPaginatorChinese extends MatPaginatorIntl {
  itemsPerPageLabel = '当前页数';
  firstPageLabel = '第一页';
  lastPageLabel = '最后一页';
  nextPageLabel = '下一页';
  previousPageLabel = '上一页';

  getRangeLabel = function (page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return `0 of ${length}`;
    }

    length = Math.max(length, 0);

    return `第 ${page + 1} 页，共 ${length} 条`;
  };
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    SearchBoxModule,
    AmusementParkModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorChinese }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
