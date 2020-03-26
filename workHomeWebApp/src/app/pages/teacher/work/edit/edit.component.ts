import { Component, OnInit } from '@angular/core';
import {Work} from '../../../../common/work';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../../service/common.service';
import {WorkService} from '../../../../service/work.service';
import {AttachmentService} from '../../../../service/attachment.service';
import {AppComponent} from '../../../../app.component';
import {isDefined} from '../../../../utils';
import {Attachment} from '../../../../common/attachment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  work = new Work();
  params = {
    workId: 0
  };
  constructor(private router: Router,
              private route: ActivatedRoute,
              private workService: WorkService,
              private appComponent: AppComponent) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.params.workId = params.id;
      console.log(params);
      this.workService.getById(+this.params.workId).subscribe((data) => {
        if (!isDefined(data.content.length) || data.content.length === 0) {
          data.content = '请将源代码、网页截图（支持拖拽）等按实验要求添加到此处。';
        }
        this.work = data;
      });
    });
  }

  /**
   * 更新数据
   */
  public update() {
    this.workService.updateOfCurrentStudent(this.work.id, this.work)
      .subscribe(() => {
        this.appComponent.success(() => {
          this.router.navigateByUrl('work');
        }, '', '保存成功!');
      });
  }

  submitBest() {

  }
  submitGood() {

  }
  submitMiddle() {

  }
  submitBad() {

  }

  submit() {

  }


}
