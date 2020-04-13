import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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

  /* 使用ViewChild在C层中使用V层中定义的 跳转到首页按钮 */
  @ViewChild('linkToIndex', {static: true})
  linkToIndex: ElementRef;

  work: Work = new Work();
  params = {
    workId: 0
  };
  constructor(private workService: WorkService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((param: { id: number }) => {
      this.params.workId = param.id;
    });
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
    this.work.score = 95;
    this.submit({id: this.work.id, work: this.work});
  }
  scoreGood() {
    this.work.score = 90;
    this.submit({id: this.work.id, work: this.work});
  }
  scoreMiddle() {
    this.work.score = 80;
    this.submit({id: this.work.id, work: this.work});
  }
  scoreBad() {
    this.work.score = 60;
    this.submit({id: this.work.id, work: this.work});
  }
  scoreZero() {
    this.work.score = 0;
    this.submit({id: this.work.id, work: this.work});
  }

  submit(params: {id: number, work: Work}) {
    this.work.reviewed = true;
    this.workService.updateScore({id: params.id, work: params.work})
      .subscribe(
        (data) => {
          console.log(data);
          this.work = data;
          this.linkToIndex.nativeElement.click();
        }
      );
  }

}
