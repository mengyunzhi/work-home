import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {StudentService} from '../../../service/student.service';
import {AppComponent} from '../../../app.component';
import {config} from '../../../conf/app.config';
import {HttpErrorResponse} from '@angular/common/http';
import {Item} from '../../../common/item';
import {ItemService} from '../../../service/item.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {

  itemForm: FormGroup;

  constructor(private builder: FormBuilder,
              private router: Router,
              private itemService: ItemService,
              private appComponent: AppComponent) {
  }

  ngOnInit() {
    this.itemForm = this.builder.group({
      name: ['', [Validators.required]],
      beginTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      description: [''],
    });
  }

  /**
   * 保存实验项目
   */
  submit() {
    this.itemService.save(this.itemForm.value)
      .subscribe(() => {
        this.appComponent.success(() => {
          this.router.navigateByUrl('/item');
        }, '新增成功');
      }, (res: HttpErrorResponse) => {
        this.appComponent.error(() => {
        }, `新增失败:${res.error.message}`);
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

}
