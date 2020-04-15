import { Component, OnInit } from '@angular/core';
import {Page} from '../../../../base/page';
import {Work} from '../../../../common/work';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {WorkService} from '../../../../service/work.service';
import {config} from '../../../../conf/app.config';
import {RouterModule} from '@angular/router';
import {Item} from '../../../../common/item';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})

export class IndexComponent implements OnInit {
  /* 分页数据 */
  pages: Array<number>;
  /* 查询参数 */
  params = {
    page: 0,
    size: 10,
    studentName: new FormControl(),
    studentSno: new FormControl(),
    item: new Item()
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
  reviewed = 1;

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
    const queryParams = {
      page: this.params.page,
      size: this.params.size,
      itemId: this.params.item.id,
      studentName: this.params.studentName.value,
      studentSno: this.params.studentSno.value
    };
    this.workService.getAll(queryParams)
      .subscribe((data: Page<Work>) => {
        this.workPage.content.content = this.setReviewed(data);
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


  /* 查询 */
  onQuery() {
    this.load();
  }

  /* 选择班级 */
  onSelectKlass(item: Item) {
    this.params.item = item;
  }

  /**
   * 单选框被用户点击时
   * @param $event 弹射值
   * @param student 当前学生
   */
  onCheckBoxChange($event: Event, reviewed: number) {
    this.reviewed = reviewed;
    console.log(this.reviewed);
    this.load();
  }

  /**
   * 根据是否查阅，调整作业内容
   * @param _workPage 所有作业
   * @return result 调整后的作业
   */
  setReviewed(_workPage: Page<Work>) {
    let result = new Array<Work>();
    switch (this.reviewed) {
      case 1: {
        result = _workPage.content;
        break;
      }
      case 2: {
        _workPage.content.forEach((work) => {
          if (work.reviewed) {result.push(work); }
        });
        break;
      }
      case 3: {
        _workPage.content.forEach((work) => {
          if (!work.reviewed) {result.push(work); }
        });
        break;
      }
    }
    return result;
  }
}
