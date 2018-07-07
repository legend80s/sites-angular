/**
 * 新闻中心
 */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface ITed {
  title: string,
  url: string,
  img: {
    src: string,
  }
}

interface IRawTed {
  pageurl: string,
  title: string,
  imgpath: string,
}

interface ITedResponse {
  data: IRawTed[]
}

@Component({
  selector: 'app-news-center',
  templateUrl: './news-center.component.html',
  styleUrls: ['./news-center.component.scss']
})
export class NewsCenterComponent implements OnInit {
  teds: Observable<ITed[]>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.teds = this.http.jsonp('https://so.open.163.com/getMovieListByType.htm?pagesize=12', 'callback')
      .pipe(
        map(response => {
          console.log('response:', response);

          const items = (response as ITedResponse).data;

          return items.map(({ pageurl, title, imgpath }) => ({
            title,
            url: pageurl,
            img: {
              src: `http://vimg1.ws.126.net${imgpath}.jpg`
            }
          }));
        })
      );
  }
}
