import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { SearchBoxModule } from "./search-box/search-box.module";
import { AmusementParkModule } from "./amusement-park/amusement-park.module";

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
