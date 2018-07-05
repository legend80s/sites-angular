import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { SearchBoxModule } from "./search-box/search-box.module";
import { AmusementParkModule } from "./amusement-park/amusement-park.module";

import { MatPaginatorIntl } from '@angular/material';

class MatPaginatorChinese extends MatPaginatorIntl {
  itemsPerPageLabel = '当前页数';
  firstPageLabel = '第一页';
  lastPageLabel = '最后一页';
  nextPageLabel = '下一页';
  previousPageLabel = '上一页';

  getRangeLabel = function (page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return '0 of ' + length;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

    return '第 ' + (startIndex + 1) + ' - ' + endIndex + ' 条，共 ' + length + ' 条';
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
