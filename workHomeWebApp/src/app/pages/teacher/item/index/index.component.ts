import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../../../../app.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ItemService} from '../../../../service/item.service';
import {Item} from '../../../../common/item';
import {Page} from '../../../../base/page';
import {config} from '../../../../conf/app.config';
import {HttpErrorResponse} from '@angular/common/http';
import {Work} from '../../../../common/work';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {

  items = {
      totalPages: 0,
      content: new Page<Item>(),
    };

  /**
   * 页码
   */
  page: number;

  /**
   * 每页大小
   */
  size: number;

  itemForm: FormGroup;

  constructor(private builder: FormBuilder,
              private appComponent: AppComponent,
              private itemService: ItemService) {
  }

  createForm() {
    this.itemForm = this.builder.group({
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
    this.itemService.page(this.page, this.size, this.itemForm.getRawValue().name)
      .subscribe((data: Page<Item>) => {
        this.items.content = data;
        this.items.totalPages = data.totalPages;
      }, () => {
        console.log('error');
      });
  }


  delete(item: Item) {
    // 确认框
    this.appComponent.confirm(() => {
      this.itemService.deleteById(item.id).subscribe(() => {
        this.pageAll();
        // 操作成功提示
        this.appComponent.success(() => {
        }, '删除成功');
      }, (res: HttpErrorResponse) => {
        // 操作失败提示
        this.appComponent.error(() => {
        }, `删除失败:${res.error.message}`);
      });
    }, '即将删除实验项目');
  }

  onPageSelected(page: number) {
    this.page = page;
    this.pageAll();
  }

  clear() {
    this.ngOnInit();
  }
}
