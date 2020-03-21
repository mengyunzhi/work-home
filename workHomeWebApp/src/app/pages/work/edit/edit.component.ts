import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../service/common.service';
import { WorkService } from '../../../service/work.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Work } from '../../../common/work';
import { Attachment } from '../../../common/attachment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  editForm: FormGroup;
  work: Work;

  constructor(private router: Router,
              private commonService: CommonService,
              private route: ActivatedRoute,
              private builder: FormBuilder,
              private workService: WorkService) {
    this.createForm();
  }

  createForm() {
    this.editForm = this.builder.group({
      content: ['', Validators.required],
      course: null
    });
  }

  initForm(data) {

    this.editForm.setValue({
      content: data.content,
      course: data.course
    });
  }

  ngOnInit() {
    this.getEditWork();
  }

  /**
   * 获取要编辑的大纲
   */
  public getEditWork() {
    this.route.params.subscribe(params => {
      this.workService.getById(params.id).subscribe((data) => {
        this.work = data;
        this.initForm(data);
      });
    });
  }

  public update(work: Work) {
    this.route.params.subscribe(params => {
      this.workService.update(params.id, work).subscribe(() => {
        // this.commonService.success(() => {
        //   this.router.navigateByUrl('/library');
        // }, '大纲库保存成功');
      }, (response: HttpErrorResponse) => {
        // this.commonService.error(() => {
        //   this.router.navigateByUrl('/library');
        // }, response.error);
      });
    });
  }

  submit() {
    this.update(this.editForm.value);
  }

  downloadAttachment(attachment: Attachment) {

  }

  contentChange($event) {
   console.log($event);
  }
}
