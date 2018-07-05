/**
 * 视频中心
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageEvent } from '@angular/material';

const JSONP_URL = 'http://open.onebox.so.com/dataApi?&tpl=2&callback=legend.cb.get360RankedVideos&_1530705469176&query=综艺&url=综艺排行&type=relation_variety_rank&src=onebox&num=1&addInfo=types:全部|region:全部|year:全部|limit:_limit|page:_page';

interface IVideo {
  url: string,
  img: {
    src: string,
    alt: string,
  },
  subtitle: string,
  title: string,
  description: string,
}

interface IResponse {
  display: {
    hot: [
      {
        imgurl: string,
        lastperiod: string,
        moviename: string,
        url: string,
        director: string[],
      }
    ]
  }
}

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.scss']
})
export class VideoCenterComponent implements OnInit {
  static TOTAL = 60;
  static PAGE_SIZE = 12;
  TOTAL = VideoCenterComponent.TOTAL;
  PAGE_SIZE = VideoCenterComponent.PAGE_SIZE;

  videos: Observable<IVideo[]>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchVideos(1);
  }

  fetchVideos(page: number, size: number = VideoCenterComponent.PAGE_SIZE) {
    this.videos = this.http.jsonp(
      JSONP_URL.replace('_limit', String(size)).replace('_page', String(page)),
      'callback'
    )
      .pipe(
        map(({ display: { hot } }: IResponse) => {
          console.log('hot:', hot);

          return hot.map(video => ({
            url: video.url,
            img: {
              src: video.imgurl,
              alt: video.moviename,
            },
            subtitle: video.lastperiod,
            title: video.moviename,
            description: `${video.moviename}（${video.director.join('、')}）更新至 ${video.lastperiod}`,
          }));
        })
      );
  }

  showPage(pageIndex: number) {
    console.log('fetch at page:', pageIndex + 1);

    this.fetchVideos(pageIndex + 1);
  }
}
