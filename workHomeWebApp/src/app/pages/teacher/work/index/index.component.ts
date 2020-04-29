import {Component, OnInit} from '@angular/core';
import {Page} from '../../../../base/page';
import {Work} from '../../../../common/work';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {WorkService} from '../../../../service/work.service';
import {config} from '../../../../conf/app.config';
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
    page: WorkService.workPage,
    size: 10,
    reviewed: undefined,
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
    this.params.page = WorkService.workPage;
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
      reviewed: this.params.reviewed,
      studentName: this.params.studentName.value,
      studentSno: this.params.studentSno.value
    };
    console.log(queryParams);
    this.workService.getAll(queryParams)
      .subscribe((data: Page<Work>) => {
        this.workPage.content = data;
        this.workPage.totalPages = data.totalPages;
      }, () => {
        console.log('error');
      });
  }

  /* 查询 */
  onQuery() {
    this.load();
  }

  /* 选择班级 */
  onSelectKlass(item: Item) {
    this.params.item = item;
    this.load();
  }

  clear() {
    this.params.studentName.setValue(null);
    this.params.studentSno.setValue(null);
    this.params.item = new Item();
    this.load();
  }

  /**
   * 单选框被用户点击时
   * @param $event 弹射值
   * @param reviewed 评阅状态码1默认2已评阅3未评阅
   */
  onCheckBoxChange($event: Event, reviewed: number) {
    switch (reviewed) {
      case 1: this.params.reviewed = undefined; break;
      case 2: this.params.reviewed = true; break;
      case 3: this.params.reviewed = false; break;
    }
    this.load();
  }

  /**
   * 根据是否查阅，调整作业内容
   * @param _workPage 所有作业
   * @return result 调整后的作业
   */
  // setReviewed(_workPage: Page<Work>) {
  //   let result = new Array<Work>();
  //   switch (this.reviewed) {
  //     case 1: {
  //       result = _workPage.content;
  //       break;
  //     }
  //     case 2: {
  //       _workPage.content.forEach((work) => {
  //         if (work.reviewed) {result.push(work); }
  //       });
  //       break;
  //     }
  //     case 3: {
  //       _workPage.content.forEach((work) => {
  //         if (!work.reviewed) {result.push(work); }
  //       });
  //       break;
  //     }
  //   }
  //   return result;
  // }

  onPageSelected(page: number) {
    WorkService.workPage = this.params.page =  page;
    this.load();
  }
}
