import { Component, OnInit } from '@angular/core';
import {Page} from '../../../../base/page';
import {Work} from '../../../../common/work';
import {FormBuilder, FormGroup} from '@angular/forms';
import {WorkService} from '../../../../service/work.service';
import {config} from '../../../../conf/app.config';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
/* export class IndexComponent implements OnInit {

  works: Page<Work>;

  /**
   * 页码
   */
  // page: number;

  /*
   * 每页大小
   */
/*  size: number;

  workForm: FormGroup;

  constructor(private builder: FormBuilder,
              private appComponent: AppComponent,
              private workService: WorkService) {
  }

  createForm() {
    this.workForm = this.builder.group({
      name: null,
    });
  }

  ngOnInit() {
    this.page = 0;
    this.size = config.size;

    this.createForm();
    this.pageAll();
  }

  public pageAll() {
    this.workService.getAll({page: this.page, size: this.size})
      .subscribe((data: Page<Work>) => {
        this.works = data;
      }, () => {
        console.work('error');
      });
  }
}
**/

export class IndexComponent implements OnInit {
  /* 分页数据 */
  pages: Array<number>;
  /* 查询参数 */
  params = {
    page: 0,
    size: 2
  };
  /* 分页数据 */
  workPage = {
    totalPages: 0,
    content: new Page<Work>()
  };
  workForm: FormGroup;
  constructor(private builder: FormBuilder,
              private workService: WorkService) {
  }

  ngOnInit() {
    this.params.page = 0;
    this.params.size = config.size;

    this.createForm();
    this.load();
  }

  createForm() {
    this.workForm = this.builder.group({
      name: null,
    });
  }

  public load() {
    this.workService.getAll({page: this.params.page, size: this.params.size})
      .subscribe((data: Page<Work>) => {
        this.workPage.content = data;
        this.workPage.totalPages = data.totalPages;
        this.pages = this.makePagesByTotalPages(this.params.page, data.totalPages);
      }, () => {
        console.log('error');
      });
  }

  /**
   * 点击分页按钮
   * @param page 要请求的页码
   */
  onPage(page: number) {
    if (page === -1 || page === this.workPage.totalPages) {
      return;
    } else {
      this.params.page = page;
      this.createForm();
      this.load();
    }
  }

  /**
   * 生成页码
   * @param begin 开始页码
   * @param end 结束页码
   */
  makePages(begin: number, end: number): Array<number> {
    const result = new Array<number>();
    for (; begin <= end; begin++) {
      result.push(begin);
    }
    return result;
  }
  /**
   * 生成分页数据
   * @param currentPage 当前页
   * @param totalPages 总页数
   */
  makePagesByTotalPages(currentPage: number, totalPages: number): Array<number> {
    if (totalPages > 0) {
      /* 总页数小于5 */
      if (totalPages <= 5) {
        return this.makePages(0, totalPages - 1);
      }

      /* 首2页 */
      if (currentPage < 2) {
        return this.makePages(0, 4);
      }

      /* 尾2页 */
      if (currentPage > totalPages - 3) {
        return this.makePages(totalPages - 5, totalPages - 1);
      }

      /* 总页数大于5，且为中间页码*/
      return this.makePages(currentPage - 2, currentPage + 2);
    }

    return new Array();
  }

}
