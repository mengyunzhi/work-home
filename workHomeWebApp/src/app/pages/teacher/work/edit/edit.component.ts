import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Work} from '../../../../common/work';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkService} from '../../../../service/work.service';
import {AppComponent} from '../../../../app.component';

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
  constructor(private router: Router,
              private workService: WorkService,
              private activatedRoute: ActivatedRoute,
              private appComponent: AppComponent) {
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
        () => {
          this.workService.getNextNotReviewedWork()
            .subscribe(
              (data) => {
                if (data === null) {
                  this.appComponent.success(() => {
                  }, '作业已全部批改完成,老师辛苦了');
                  this.linkToIndex.nativeElement.click();
                } else {
                  this.work = data;
                }
              }
            );
        }
      );

  }

  close() {
    this.linkToIndex.nativeElement.click();
  }
}
