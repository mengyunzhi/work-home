import {Component, ElementRef, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppComponent } from '../../../../app.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemService } from '../../../../service/item.service';
import { Item } from '../../../../common/item';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

  itemForm: FormGroup;

  linkToIndex: ElementRef;

  /**
   * 要编辑的实验项目Id
   */
  id: number;

  constructor(private builder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private itemService: ItemService,
              private appComponent: AppComponent,
              private datePipe: DatePipe) {
    this.createForm();
  }

  /**
   * 创建表单
   */
  createForm() {
    this.itemForm = this.builder.group({
      name: ['', [Validators.required]],
      beginTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      dir: ['', [this.itemService.dirValidator()]],
      description: [''],
    });
  }

  initForm(data) {
    this.itemForm.setValue({
      name: data.name,
      beginTime: this.datePipe.transform(new Date(data.beginTime), 'yyyy-MM-dd'),
      endTime: this.datePipe.transform(new Date(data.endTime), 'yyyy-MM-dd'),
      dir: data.dir,
      description: data.description,
    });
  }

  ngOnInit() {
    this.getEditItem();
  }

  getEditItem() {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      this.id = +params.id;
      this.itemService.findById(params.id)
        .subscribe((item: Item) => {
          this.initForm(item);
        });
    });
  }

  /**
   * 更新实验项目信息
   */
  submit() {
    this.itemService.update(this.id, this.itemForm.value)
      .subscribe(() => {
        this.appComponent.success(() => {
          this.router.navigateByUrl('/teacher/item');
        }, '实验项目更新成功');
      }, (res: HttpErrorResponse) => {
        this.appComponent.error(() => {
        }, `实验项目更新失败:${res.error.message}`);
      });
  }

  get name(): AbstractControl {
    return this.itemForm.get('name');
  }

  get beginTime(): AbstractControl {
    return this.itemForm.get('beginTime');
  }

  get endTime(): AbstractControl {
    return this.itemForm.get('endTime');
  }

  get dir(): AbstractControl {
    return this.itemForm.get('dir');
  }
}
