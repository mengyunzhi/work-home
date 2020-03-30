import { Component, OnInit } from '@angular/core';
import {Work} from '../../../../common/work';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../../service/common.service';
import {WorkService} from '../../../../service/work.service';
import {AttachmentService} from '../../../../service/attachment.service';
import {AppComponent} from '../../../../app.component';
import {isDefined} from '../../../../utils';
import {Attachment} from '../../../../common/attachment';
import {config} from '../../../../conf/app.config';
import {Page} from '../../../../base/page';

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
  constructor(private workService: WorkService) {
  }

  /*ngOnInit() {
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
  }*/

  ngOnInit() {
    this.params.workId = 0;
    this.load();
  }


  public load() {
    this.workService.getById({id: this.params.workId})
      .subscribe((data) => {
        this.work = data;
        console.log(this.work);
      }, () => {
        console.log('error');
      });
  }

  scoreBest() {
    console.log('best click');
    this.work.score = 95;
    this.submit();
  }
  scoreGood() {
    this.work.score = 90;
    this.submit();
  }
  scoreMiddle() {
    this.work.score = 80;
    this.submit();
  }
  scoreBad() {
    this.work.score = 60;
    this.submit();
  }

  submit() {

  }


}
