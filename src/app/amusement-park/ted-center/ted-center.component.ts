/**
 * 新闻中心
 */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IPagination, IFrom } from 'src/app/resources-controls/resources-controls.component';

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

// TODO 错误处理，拦截器 MatSnackBar
@Component({
  selector: 'app-ted-center',
  templateUrl: './ted-center.component.html',
  styleUrls: ['./ted-center.component.scss']
})
export class TedCenterComponent implements OnInit {
  teds: Array<ITed[]>;
  static PAGE_SIZE = 12;
  static TOTAL_PAGES = 5;
  pageIndex: number = 0;

  from: IFrom = { text: 'TED - 网易公开课', url: 'https://open.163.com/ted' };
  pagination: IPagination = {
    total: TedCenterComponent.PAGE_SIZE * TedCenterComponent.TOTAL_PAGES,
    pageSize: TedCenterComponent.PAGE_SIZE,
    page: (pageIndex: number) => { this.showPage(pageIndex) },
  };

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    // 获取所有的 TED 视频
    this.http.jsonp(
      `https://so.open.163.com/getMovieListByType.htm?pagesize=${this.pagination.total}`,
      'callback'
    )
      .pipe(
        // 格式化
        map(TedCenterComponent.format),
        // 分页
        map(TedCenterComponent.paginate)
      )
      .subscribe(teds => this.teds = teds);
  }

  private showPage(pageIndex: number): void {
    console.log('show page index', pageIndex);
    this.pageIndex = pageIndex;
  }

  private static format(response: ITedResponse): ITed[] {
    // console.log('response in format:', response);

    const items = response.data;

    return items.map(({ pageurl, title, imgpath }) => ({
      title,
      url: pageurl,
      img: {
        src: `http://vimg1.ws.126.net${imgpath}.jpg`
      }
    }));
  }

  private static paginate(videos: ITed[]): Array<ITed[]> {
    // console.log('videos in paginate', videos);

    const teds = [];

    for (let page = 0; page < TedCenterComponent.TOTAL_PAGES; page += 1) {
      // console.log('page:', page);
      // console.log('NewsCenterComponent.PAGE_SIZE:', NewsCenterComponent.PAGE_SIZE);
      // console.log('page * NewsCenterComponent.PAGE_SIZE:', page * NewsCenterComponent.PAGE_SIZE);
      // console.log('(page + 1) * NewsCenterComponent.PAGE_SIZE:', (page + 1) * NewsCenterComponent.PAGE_SIZE);
      const sliced = videos.slice(page * TedCenterComponent.PAGE_SIZE, (page + 1) * TedCenterComponent.PAGE_SIZE);
      // console.log('sliced:', sliced);

      teds.push(sliced);
    }

    console.log('teds after 人工分页', teds);

    return teds;
  }
}
